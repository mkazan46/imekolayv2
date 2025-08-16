import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'TEACHER' | 'SCHOOL_ADMIN' | 'VENDOR';
  school?: string;
  schoolId?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  vendorLogin: (email: string, password: string) => Promise<void>;
  schoolLogin: (institutionCode: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock authentication - replace with real API calls
  const login = async (email: string, password: string) => {
    setLoading(true);
    
    try {
      // In a real app, this would be an API call
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const { user, token } = await response.json();
      
      // Store token in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      setUser(user);
    } catch (error) {
      console.log('API login failed, using mock data for demo');
      // Fallback to mock data for demo
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      let mockUser: User;
      if (email.includes('teacher')) {
        mockUser = {
          id: '1',
          name: 'Ahmet Öğretmen',
          email: email,
          role: 'TEACHER',
          school: 'Atatürk Mesleki ve Teknik Anadolu Lisesi',
          schoolId: 'school-1'
        };
      } else if (email.includes('admin')) {
        mockUser = {
          id: '2',
          name: 'Mehmet Yönetici',
          email: email,
          role: 'SCHOOL_ADMIN',
          school: 'Atatürk Mesleki ve Teknik Anadolu Lisesi',
          schoolId: 'school-1'
        };
      } else if (email.includes('vendor')) {
        mockUser = {
          id: '3',
          name: 'Fatma Satıcı',
          email: email,
          role: 'VENDOR'
        };
      } else {
        // Default fallback - shouldn't happen with proper demo accounts
        throw new Error('Geçersiz giriş bilgileri');
      }
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    }
    
    setLoading(false);
  };

  const vendorLogin = async (email: string, password: string) => {
    setLoading(true);
    
    try {
      const response = await fetch('/api/auth/vendor-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Girdiğiniz bilgiler hatalı.');
      }

      const { user, token } = await response.json();
      
      // Store token in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      setUser(user);
    } catch (error: any) {
      console.error('Vendor login error:', error);
      throw new Error(error.message || 'Girdiğiniz bilgiler hatalı.');
    } finally {
      setLoading(false);
    }
  };

  const schoolLogin = async (institutionCode: string, email: string, password: string) => {
    setLoading(true);
    
    try {
      const response = await fetch('/api/auth/school-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ institutionCode, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Girdiğiniz bilgiler hatalı.');
      }

      const { user, token } = await response.json();
      
      // Store token in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      setUser(user);
    } catch (error: any) {
      console.error('School login error:', error);
      throw new Error(error.message || 'Girdiğiniz bilgiler hatalı.');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, vendorLogin, schoolLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};