import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  FileText, 
  Users, 
  Calendar, 
  Building, 
  ClipboardList,
  MessageCircle,
  BarChart3,
  Settings,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  UserCheck,
  MapPin,
  Briefcase,
  Shield
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useAuth();
  const location = useLocation();

  const getMenuItems = () => {
    switch (user?.role) {
      case 'TEACHER':
        return [
          { path: '/teacher', icon: Home, label: 'Kontrol Paneli' },
          { path: '/teacher/forms', icon: FileText, label: 'Koordinatörlük Formları' },
          { path: '/teacher/attendance', icon: UserCheck, label: 'Devam-Devamsızlık' },
          { path: '/teacher/visits', icon: MapPin, label: 'Ziyaret Planlama' },
          { path: '/teacher/students', icon: Users, label: 'Öğrenci Listesi' },
          { path: '/teacher/messages', icon: MessageCircle, label: 'Mesajlar' }
        ];
      case 'SCHOOL_ADMIN':
        return [
          { path: '/school', icon: Home, label: 'Kontrol Paneli' },
          { path: '/school/teachers', icon: BookOpen, label: 'Öğretmenler' },
          { path: '/school/students', icon: Users, label: 'Öğrenciler' },
          { path: '/school/companies', icon: Building, label: 'İşletmeler' },
          { path: '/school/assignments', icon: Briefcase, label: 'Atama Sihirbazı' },
          { path: '/school/calendar', icon: Calendar, label: 'Ziyaret Takvimi' },
          { path: '/school/reports', icon: BarChart3, label: 'Raporlar' },
          { path: '/school/documents', icon: ClipboardList, label: 'Koordinatörlük Evrakları' }
        ];
      case 'VENDOR':
        return [
          { path: '/vendor', icon: Home, label: 'Kontrol Paneli' },
          { path: '/vendor/schools', icon: GraduationCap, label: 'Okul Tanımlama' },
          { path: '/vendor/licenses', icon: Shield, label: 'Lisans Yönetimi' },
          { path: '/vendor/support', icon: MessageCircle, label: 'Destek Talepleri' }
        ];
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  return (
    <div className={`bg-white shadow-lg transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}>
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-blue-600" />
              <h1 className="text-lg font-bold text-gray-800">MEB Koordinatörlük</h1>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded-md hover:bg-gray-100"
          >
            {collapsed ? (
              <ChevronRight className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronLeft className="h-5 w-5 text-gray-500" />
            )}
          </button>
        </div>
      </div>

      {!collapsed && user && (
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-semibold text-sm">
                {user.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">{user.name}</p>
              <p className="text-xs text-gray-500">
                {user.role === 'TEACHER' ? 'Öğretmen' :
                 user.role === 'SCHOOL_ADMIN' ? 'Okul Yöneticisi' : 'Satıcı'}
              </p>
            </div>
          </div>
        </div>
      )}

      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path || 
              (item.path !== '/teacher' && item.path !== '/school' && item.path !== '/vendor' && 
               location.pathname.startsWith(item.path));
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;