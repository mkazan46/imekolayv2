import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import LoginForm from './components/auth/LoginForm';
import VendorLogin from './components/auth/VendorLogin';
import SchoolLogin from './components/auth/SchoolLogin';
import TeacherDashboard from './components/dashboards/TeacherDashboard';
import SchoolManagementDashboard from './components/dashboards/SchoolManagementDashboard';
import VendorDashboard from './components/dashboards/VendorDashboard';
import Layout from './components/layout/Layout';
import { AuthProvider, useAuth } from './contexts/AuthContext';

const VendorLoginPage: React.FC = () => {
  const { vendorLogin } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    
    try {
      await vendorLogin(email, password);
      navigate('/vendor');
    } catch (err: any) {
      const errorMessage = err.message || 'Girdiğiniz bilgiler hatalı.';
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    window.location.href = '/';
  };

  return (
    <VendorLogin
      onLogin={handleLogin}
      onBack={handleBack}
      loading={loading}
      error={''}
    />
  );
};

const SchoolLoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/school');
  };

  const handleBack = () => {
    window.location.href = '/';
  };

  return (
    <SchoolLogin
      onLogin={handleLogin}
      onBack={handleBack}
    />
  );
};

const AppRoutes: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/satici" element={<VendorLoginPage />} />
      <Route path="/okul-giris" element={<SchoolLoginPage />} />
      <Route path="/" element={
        !user ? <LoginForm /> :
        user.role === 'TEACHER' ? <Navigate to="/teacher" replace /> :
        user.role === 'SCHOOL_ADMIN' ? <Navigate to="/school" replace /> :
        user.role === 'VENDOR' ? <Navigate to="/vendor" replace /> :
        <Navigate to="/" replace />
      } />
      <Route path="/teacher/*" element={
        user ? <Layout><TeacherDashboard /></Layout> : <Navigate to="/" replace />
      } />
      <Route path="/school/*" element={
        user ? <Layout><SchoolManagementDashboard /></Layout> : <Navigate to="/" replace />
      } />
      <Route path="/vendor/*" element={
        user ? <Layout><VendorDashboard /></Layout> : <Navigate to="/" replace />
      } />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;