import React, { useState } from 'react';
import RoleSelector from './RoleSelector';
import TeacherLogin from './TeacherLogin';
import SchoolAdminLogin from './SchoolAdminLogin';
import { useAuth } from '../../contexts/AuthContext';

const LoginForm: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<'teacher' | 'school_admin' | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    setError('');
    
    try {
      await login(email, password);
    } catch (err) {
      setError('Giriş bilgileri hatalı. Lütfen tekrar deneyin.');
    }
    
    setLoading(false);
  };

  const handleBack = () => {
    setSelectedRole(null);
    setError('');
  };

  if (!selectedRole) {
    return <RoleSelector onRoleSelect={setSelectedRole} />;
  }

  if (selectedRole === 'teacher') {
    return (
      <TeacherLogin
        onLogin={handleLogin}
        onBack={handleBack}
        loading={loading}
        error={error}
      />
    );
  }

  if (selectedRole === 'school_admin') {
    return (
      <SchoolAdminLogin
        onLogin={handleLogin}
        onBack={handleBack}
        loading={loading}
        error={error}
      />
    );
  }

  return null;
};

export default LoginForm;