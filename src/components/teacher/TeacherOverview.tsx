import React from 'react';
import { 
  Calendar, 
  FileText, 
  Users, 
  MapPin, 
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import StatsCard from '../ui/StatsCard';
import RecentActivity from '../ui/RecentActivity';

const TeacherOverview: React.FC = () => {
  const stats = [
    {
      title: 'Bugünkü Ziyaretler',
      value: '3',
      icon: MapPin,
      color: 'blue',
      change: '+2'
    },
    {
      title: 'Aylık Toplam Ziyaret',
      value: '24',
      icon: Calendar,
      color: 'green',
      change: '+18%'
    },
    {
      title: 'Bekleyen Formlar',
      value: '5',
      icon: FileText,
      color: 'orange',
      change: '-2'
    },
    {
      title: 'Toplam Öğrenci',
      value: '42',
      icon: Users,
      color: 'purple',
      change: '+3'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'visit',
      title: 'ABC Teknoloji A.Ş. ziyareti tamamlandı',
      time: '2 saat önce',
      icon: CheckCircle,
      color: 'green'
    },
    {
      id: 2,
      type: 'form',
      title: 'Koordinatörlük formu kaydedildi',
      time: '4 saat önce',
      icon: FileText,
      color: 'blue'
    },
    {
      id: 3,
      type: 'alert',
      title: 'Ahmet Yılmaz devamsızlık uyarısı',
      time: '1 gün önce',
      icon: AlertTriangle,
      color: 'orange'
    },
    {
      id: 4,
      type: 'calendar',
      title: 'Yarınki ziyaret planlandı',
      time: '2 gün önce',
      icon: Calendar,
      color: 'purple'
    }
  ];

  const upcomingVisits = [
    {
      id: 1,
      company: 'XYZ Bilişim Ltd.',
      student: 'Mehmet Demir',
      time: '09:00',
      address: 'Ankara / Çankaya'
    },
    {
      id: 2,
      company: 'TechSoft A.Ş.',
      student: 'Ayşe Kaya',
      time: '14:00',
      address: 'Ankara / Keçiören'
    },
    {
      id: 3,
      company: 'Digital Solutions',
      student: 'Ali Özkan',
      time: '16:30',
      address: 'Ankara / Mamak'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Kontrol Paneli</h1>
          <p className="text-gray-600">Koordinatörlük faaliyetlerinizi yönetin</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2">
            <FileText className="h-4 w-4" />
            <span>Yeni Form</span>
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>Ziyaret Planla</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Son Aktiviteler</h3>
          <RecentActivity activities={recentActivities} />
        </div>

        {/* Upcoming Visits */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Bugünkü Ziyaretler</h3>
            <Clock className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {upcomingVisits.map((visit) => (
              <div key={visit.id} className="border-l-4 border-blue-500 pl-4 py-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900">{visit.company}</h4>
                  <span className="text-sm text-gray-500">{visit.time}</span>
                </div>
                <p className="text-sm text-gray-600">Öğrenci: {visit.student}</p>
                <p className="text-xs text-gray-500 flex items-center">
                  <MapPin className="h-3 w-3 mr-1" />
                  {visit.address}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Hızlı İşlemler</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
            <FileText className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-700">Günlük Rapor Oluştur</p>
          </button>
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors">
            <Users className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-700">Devam Durumu Güncelle</p>
          </button>
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors">
            <Calendar className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-700">Haftalık Program</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherOverview;