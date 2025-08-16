import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from './database';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: 'TEACHER' | 'SCHOOL_ADMIN' | 'VENDOR';
  schoolId?: string;
}

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, 12);
};

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

export const generateToken = (user: AuthUser): string => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
      schoolId: user.schoolId
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
};

export const verifyToken = (token: string): AuthUser | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as AuthUser;
  } catch {
    return null;
  }
};

export const authenticateUser = async (email: string, password: string): Promise<AuthUser | null> => {
  try {
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
      return null;
    }

    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      schoolId: user.schoolId || undefined
    };
  } catch (error) {
    console.error('Authentication error:', error);
    return null;
  }
};