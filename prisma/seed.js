const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  // Create a sample school
  const school = await prisma.school.create({
    data: {
      name: 'Atatürk Mesleki ve Teknik Anadolu Lisesi',
      address: 'Kızılay Mahallesi, Atatürk Bulvarı No:123',
      city: 'Ankara',
      district: 'Çankaya',
      phone: '0312 123 4567',
      email: 'info@ataturkml.meb.gov.tr',
      licenseEnd: new Date('2024-12-31')
    }
  });

  // Hash passwords
  const hashedPassword = await bcrypt.hash('123456', 12);

  // Create sample users
  const teacher = await prisma.user.create({
    data: {
      email: 'teacher@meb.gov.tr',
      password: hashedPassword,
      name: 'Ahmet Öğretmen',
      role: 'TEACHER',
      schoolId: school.id,
      teacherProfile: {
        create: {
          branch: 'Bilişim Teknolojileri',
          phone: '0532 123 4567'
        }
      }
    },
    include: {
      teacherProfile: true
    }
  });

  const admin = await prisma.user.create({
    data: {
      email: 'admin@meb.gov.tr',
      password: hashedPassword,
      name: 'Mehmet Yönetici',
      role: 'SCHOOL_ADMIN',
      schoolId: school.id,
      adminProfile: {
        create: {
          title: 'Müdür Yardımcısı'
        }
      }
    }
  });

  const vendor = await prisma.user.create({
    data: {
      email: 'vendor@meb.gov.tr',
      password: hashedPassword,
      name: 'Fatma Satıcı',
      role: 'VENDOR',
      vendorProfile: {
        create: {
          company: 'EduTech Solutions',
          phone: '0212 987 6543'
        }
      }
    }
  });

  // Create sample companies
  const companies = await Promise.all([
    prisma.company.create({
      data: {
        name: 'ABC Teknoloji A.Ş.',
        sector: 'Bilişim',
        address: 'Çankaya, Ankara',
        city: 'Ankara',
        phone: '0312 456 7890',
        email: 'info@abctech.com',
        contact: 'Mustafa Erdoğan',
        schoolId: school.id
      }
    }),
    prisma.company.create({
      data: {
        name: 'XYZ Bilişim Ltd.',
        sector: 'Yazılım',
        address: 'Keçiören, Ankara',
        city: 'Ankara',
        phone: '0312 789 0123',
        email: 'info@xyzbilisim.com',
        contact: 'Fatma Özdemir',
        schoolId: school.id
      }
    })
  ]);

  // Create sample students
  const students = await Promise.all([
    prisma.student.create({
      data: {
        number: '101',
        name: 'Ahmet Yılmaz',
        email: 'ahmet.yilmaz@email.com',
        phone: '0532 123 4567',
        class: '11-A',
        schoolId: school.id,
        teacherId: teacher.teacherProfile.id,
        companyId: companies[0].id
      }
    }),
    prisma.student.create({
      data: {
        number: '102',
        name: 'Ayşe Kaya',
        email: 'ayse.kaya@email.com',
        phone: '0543 234 5678',
        class: '11-A',
        schoolId: school.id,
        teacherId: teacher.teacherProfile.id,
        companyId: companies[1].id
      }
    })
  ]);

  // Create sample vendor users for vendor panel
  const vendorUsers = await Promise.all([
    prisma.vendorUser.create({
      data: {
        email: 'satici1@teknoloji.com',
        password: hashedPassword,
        name: 'Ali Teknoloji',
        company: 'Teknoloji A.Ş.',
        phone: '0212 555 1111'
      }
    }),
    prisma.vendorUser.create({
      data: {
        email: 'satici2@bilisim.com',
        password: hashedPassword,
        name: 'Ayşe Bilişim',
        company: 'Bilişim Ltd.',
        phone: '0212 555 2222'
      }
    }),
    prisma.vendorUser.create({
      data: {
        email: 'satici3@yazilim.com',
        password: hashedPassword,
        name: 'Mehmet Yazılım',
        company: 'Yazılım Çözümleri A.Ş.',
        phone: '0212 555 3333'
      }
    })
  ]);

  console.log('Database seeded successfully!');
  console.log('Demo accounts:');
  console.log('Teacher: teacher@meb.gov.tr / 123456');
  console.log('Admin: admin@meb.gov.tr / 123456');
  console.log('Vendor: vendor@meb.gov.tr / 123456');
  console.log('\nVendor Panel Users:');
  console.log('Satıcı 1: satici1@teknoloji.com / 123456');
  console.log('Satıcı 2: satici2@bilisim.com / 123456');
  console.log('Satıcı 3: satici3@yazilim.com / 123456');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });