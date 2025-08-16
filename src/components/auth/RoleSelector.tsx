import React from 'react';
import { GraduationCap, Building2, ArrowRight } from 'lucide-react';

interface RoleSelectorProps {
  onRoleSelect: (role: 'teacher' | 'school_admin') => void;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({ onRoleSelect }) => {

  const roles = [
    {
      id: 'teacher',
      title: 'Öğretmen',
      description: 'Koordinatörlük faaliyetlerini yönetin',
      icon: GraduationCap,
      color: 'blue',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      id: 'school_admin',
      title: 'Okul Yöneticisi',
      description: 'Okul geneli süreçleri yönetin',
      icon: Building2,
      color: 'green',
      gradient: 'from-green-500 to-green-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center p-6">
      <div className="w-full max-w-6xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-blue-50 rounded-3xl shadow-lg mb-8">
            <GraduationCap className="w-12 h-12 text-blue-600" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            MEB Koordinatörlük Sistemi
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Rolünüzü seçerek dijital eğitim yönetimi platformuna giriş yapın
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {roles.map((role) => (
            <div
              key={role.id}
              onClick={() => onRoleSelect(role.id as any)}
              className="group cursor-pointer transition-all duration-300 hover:scale-105"
            >
              <div className="bg-white rounded-2xl p-10 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-gray-300">
                <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${role.gradient} rounded-2xl mb-6 shadow-md`}>
                  <role.icon className="w-10 h-10 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {role.title}
                </h3>
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                  {role.description}
                </p>

                <div className={`flex items-center justify-between text-${role.color}-600 font-semibold text-lg`}>
                  <span>Giriş Yap</span>
                  <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoleSelector;