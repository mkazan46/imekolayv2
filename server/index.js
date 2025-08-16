const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key';

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Auth middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Auth routes
app.post('/api/auth/school-login', async (req, res) => {
  try {
    const { institutionCode, email, password } = req.body;

    if (!institutionCode || !email || !password) {
      return res.status(400).json({ error: 'Tüm alanları doldurun' });
    }

    // Find school by institution code
    const school = await prisma.school.findUnique({
      where: { institutionCode }
    });

    if (!school || !school.isActive) {
      return res.status(401).json({ error: 'Geçersiz kurum kodu' });
    }

    // Check email and temporary password
    if (school.email !== email || school.temporaryPassword !== password) {
      return res.status(401).json({ error: 'E-posta veya şifre hatalı' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: school.id, 
        email: school.email, 
        role: 'SCHOOL_ADMIN',
        institutionCode: school.institutionCode,
        schoolName: school.name
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: school.id,
        email: school.email,
        name: school.name,
        role: 'SCHOOL_ADMIN',
        institutionCode: school.institutionCode
      }
    });
  } catch (error) {
    console.error('School login error:', error);
    res.status(500).json({ error: 'Giriş yapılırken bir hata oluştu' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        school: true,
        teacherProfile: true,
        adminProfile: true,
        vendorProfile: true
      }
    });

    if (!user || !user.isActive) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
        schoolId: user.schoolId
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    const userResponse = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      school: user.school?.name,
      schoolId: user.schoolId
    };

    res.json({ user: userResponse, token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Vendor login route
app.post('/api/auth/vendor-login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const vendorUser = await prisma.vendorUser.findUnique({
      where: { email }
    });

    if (!vendorUser || !vendorUser.isActive) {
      return res.status(401).json({ error: 'Girdiğiniz bilgiler hatalı.' });
    }

    // For now, compare passwords directly (in production, use bcrypt)
    const isValidPassword = password === vendorUser.password;
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Girdiğiniz bilgiler hatalı.' });
    }

    const token = jwt.sign(
      {
        id: vendorUser.id,
        email: vendorUser.email,
        role: 'VENDOR',
        type: 'vendor_user'
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    const userResponse = {
      id: vendorUser.id,
      email: vendorUser.email,
      name: vendorUser.name,
      role: 'VENDOR',
      company: vendorUser.company,
      phone: vendorUser.phone
    };

    res.json({ user: userResponse, token });
  } catch (error) {
    console.error('Vendor login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Protected routes
app.get('/api/user/profile', authenticateToken, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: {
        school: true,
        teacherProfile: true,
        adminProfile: true,
        vendorProfile: true
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      school: user.school?.name,
      schoolId: user.schoolId
    });
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Utility function to generate temporary password
const generateTemporaryPassword = () => {
  const chars = 'ABCDEFGHJKMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
  let password = '';
  for (let i = 0; i < 8; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

// School management routes
app.post('/api/schools', authenticateToken, async (req, res) => {
  try {
    // Check if user is vendor
    if (req.user.role !== 'VENDOR') {
      return res.status(403).json({ error: 'Sadece satıcılar okul ekleyebilir' });
    }

    const { name, institutionCode, address, city, district, phone, email } = req.body;

    // Validate required fields
    if (!name || !institutionCode || !address || !city || !district || !email) {
      return res.status(400).json({ error: 'Tüm zorunlu alanları doldurun' });
    }

    // Check if institution code already exists
    const existingSchool = await prisma.school.findUnique({
      where: { institutionCode }
    });

    if (existingSchool) {
      return res.status(400).json({ error: 'Bu kurum kodu zaten kullanılıyor' });
    }

    // Generate temporary password
    const temporaryPassword = generateTemporaryPassword();

    // Create school
    const school = await prisma.school.create({
      data: {
        name,
        institutionCode,
        address,
        city,
        district,
        phone,
        email,
        temporaryPassword,
        isActive: true
      }
    });

    res.status(201).json({
      message: 'Okul başarıyla eklendi',
      school: {
        id: school.id,
        name: school.name,
        institutionCode: school.institutionCode,
        email: school.email,
        temporaryPassword: school.temporaryPassword
      }
    });
  } catch (error) {
    console.error('School creation error:', error);
    res.status(500).json({ error: 'Okul eklenirken bir hata oluştu' });
  }
});

// Get all schools (for vendor)
app.get('/api/schools', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'VENDOR') {
      return res.status(403).json({ error: 'Yetkisiz erişim' });
    }

    const schools = await prisma.school.findMany({
      select: {
        id: true,
        name: true,
        institutionCode: true,
        email: true,
        city: true,
        district: true,
        isActive: true,
        createdAt: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json(schools);
  } catch (error) {
    console.error('Schools fetch error:', error);
    res.status(500).json({ error: 'Okullar getirilirken bir hata oluştu' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});