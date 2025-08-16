import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Plus, Filter } from 'lucide-react';

const VisitPlanning: React.FC = () => {
  const [currentView, setCurrentView] = useState('month');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const visits = [
    {
      id: 1,
      date: '2024-01-15',
      time: '09:00',
      student: 'Ahmet Yılmaz',
      company: 'ABC Teknoloji A.Ş.',
      address: 'Ankara / Çankaya',
      status: 'scheduled',
      note: 'İlk ziyaret'
    },
    {
      id: 2,
      date: '2024-01-15',
      time: '14:00',
      student: 'Ayşe Kaya',
      company: 'XYZ Bilişim Ltd.',
      address: 'Ankara / Keçiören',
      status: 'completed',
      note: 'Performans değerlendirmesi yapıldı'
    },
    {
      id: 3,
      date: '2024-01-16',
      time: '10:30',
      student: 'Mehmet Demir',
      company: 'TechSoft A.Ş.',
      address: 'Ankara / Mamak',
      status: 'scheduled',
      note: ''
    },
    {
      id: 4,
      date: '2024-01-17',
      time: '13:00',
      student: 'Fatma Özkan',
      company: 'Digital Solutions',
      address: 'Ankara / Yenimahalle',
      status: 'planned',
      note: 'Staj sonu değerlendirme'
    }
  ];

  const getStatusBadge = (status: string) => {
    const badges = {
      planned: 'bg-blue-100 text-blue-800',
      scheduled: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    
    const labels = {
      planned: 'Planlandı',
      scheduled: 'Zamanlandı',
      completed: 'Tamamlandı',
      cancelled: 'İptal Edildi'
    };

    return (
      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${badges[status as keyof typeof badges]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  const todayVisits = visits.filter(visit => visit.date === selectedDate);
  const upcomingVisits = visits.filter(visit => new Date(visit.date) > new Date(selectedDate));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Ziyaret Planlama</h1>
          <p className="text-gray-600">İşletme ziyaretlerinizi planlayın ve takip edin</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center space-x-2">
            <MapPin className="h-4 w-4" />
            <span>Harita Görünümü</span>
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Yeni Ziyaret</span>
          </button>
        </div>
      </div>

      {/* Calendar View Toggle */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setCurrentView('day')}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  currentView === 'day' 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Günlük
              </button>
              <button
                onClick={() => setCurrentView('week')}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  currentView === 'week' 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Haftalık
              </button>
              <button
                onClick={() => setCurrentView('month')}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  currentView === 'month' 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Aylık
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-gray-400" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select className="border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="">Tüm Durumlar</option>
              <option value="planned">Planlandı</option>
              <option value="scheduled">Zamanlandı</option>
              <option value="completed">Tamamlandı</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Visits */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                Bugünkü Ziyaretler ({todayVisits.length})
              </h3>
            </div>
            <div className="p-6 space-y-4">
              {todayVisits.map((visit) => (
                <div key={visit.id} className="border-l-4 border-blue-500 pl-4 py-3 bg-blue-50 rounded-r-md">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-blue-700">{visit.time}</span>
                    {getStatusBadge(visit.status)}
                  </div>
                  <h4 className="font-medium text-gray-900">{visit.company}</h4>
                  <p className="text-sm text-gray-600">Öğrenci: {visit.student}</p>
                  <p className="text-xs text-gray-500 flex items-center mt-1">
                    <MapPin className="h-3 w-3 mr-1" />
                    {visit.address}
                  </p>
                  {visit.note && (
                    <p className="text-xs text-gray-600 mt-2 bg-white p-2 rounded">
                      {visit.note}
                    </p>
                  )}
                </div>
              ))}
              {todayVisits.length === 0 && (
                <div className="text-center text-gray-500 py-8">
                  <Calendar className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                  <p>Bugün ziyaret planınız bulunmuyor</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Calendar and Upcoming Visits */}
        <div className="lg:col-span-2 space-y-6">
          {/* Mini Calendar */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Takvim Görünümü</h3>
              <div className="flex items-center space-x-2">
                <button className="p-2 hover:bg-gray-100 rounded-md">←</button>
                <span className="font-medium">Ocak 2024</span>
                <button className="p-2 hover:bg-gray-100 rounded-md">→</button>
              </div>
            </div>
            <div className="h-64 bg-gray-50 rounded-md flex items-center justify-center">
              <p className="text-gray-500">Takvim bileşeni burada olacak (FullCalendar)</p>
            </div>
          </div>

          {/* Upcoming Visits */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                Yaklaşan Ziyaretler ({upcomingVisits.length})
              </h3>
            </div>
            <div className="divide-y divide-gray-200">
              {upcomingVisits.map((visit) => (
                <div key={visit.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <div className="flex flex-col items-center justify-center w-12 h-12 bg-blue-100 rounded-md">
                          <span className="text-xs font-medium text-blue-600">
                            {new Date(visit.date).getDate()}
                          </span>
                          <span className="text-xs text-blue-500">
                            {new Date(visit.date).toLocaleDateString('tr-TR', { month: 'short' })}
                          </span>
                        </div>
                        <div>
                          <h4 className="text-lg font-medium text-gray-900">{visit.company}</h4>
                          <p className="text-sm text-gray-600">Öğrenci: {visit.student}</p>
                          <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                            <span className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {visit.time}
                            </span>
                            <span className="flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {visit.address}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(visit.status)}
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        Düzenle
                      </button>
                    </div>
                  </div>
                  {visit.note && (
                    <div className="mt-3 ml-15 p-3 bg-gray-50 rounded-md">
                      <p className="text-sm text-gray-600">{visit.note}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitPlanning;