import React, { useState } from 'react';
import { Users, Search, Filter, Phone, Mail, Building, AlertCircle, CheckCircle } from 'lucide-react';

const StudentList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [classFilter, setClassFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const students = [
    {
      id: 1,
      name: 'Ahmet Yılmaz',
      number: '101',
      class: '11-A',
      phone: '0532 123 4567',
      email: 'ahmet.yilmaz@email.com',
      company: 'ABC Teknoloji A.Ş.',
      supervisor: 'Mustafa Erdoğan',
      status: 'active',
      attendanceRate: 95,
      performance: 'excellent',
      lastVisit: '2024-01-10',
      notes: 'Çok başarılı bir öğrenci, işletmede memnuniyet var'
    },
    {
      id: 2,
      name: 'Ayşe Kaya',
      number: '102',
      class: '11-A',
      phone: '0543 234 5678',
      email: 'ayse.kaya@email.com',
      company: 'XYZ Bilişim Ltd.',
      supervisor: 'Fatma Özdemir',
      status: 'active',
      attendanceRate: 88,
      performance: 'good',
      lastVisit: '2024-01-08',
      notes: ''
    },
    {
      id: 3,
      name: 'Mehmet Demir',
      number: '103',
      class: '11-A',
      phone: '0555 345 6789',
      email: 'mehmet.demir@email.com',
      company: 'TechSoft A.Ş.',
      supervisor: 'Ali Yıldız',
      status: 'warning',
      attendanceRate: 72,
      performance: 'average',
      lastVisit: '2024-01-05',
      notes: 'Devamsızlık sorunu var, takip edilmeli'
    },
    {
      id: 4,
      name: 'Fatma Özkan',
      number: '104',
      class: '11-B',
      phone: '0542 456 7890',
      email: 'fatma.ozkan@email.com',
      company: 'Digital Solutions',
      supervisor: 'Mehmet Kaya',
      status: 'active',
      attendanceRate: 92,
      performance: 'good',
      lastVisit: '2024-01-12',
      notes: ''
    },
    {
      id: 5,
      name: 'Ali Çetin',
      number: '105',
      class: '11-B',
      phone: '0533 567 8901',
      email: 'ali.cetin@email.com',
      company: '',
      supervisor: '',
      status: 'unassigned',
      attendanceRate: 0,
      performance: 'not_rated',
      lastVisit: '-',
      notes: 'İşletme ataması bekleniyor'
    }
  ];

  const getStatusBadge = (status: string) => {
    const badges = {
      active: 'bg-green-100 text-green-800',
      warning: 'bg-yellow-100 text-yellow-800',
      unassigned: 'bg-gray-100 text-gray-800',
      inactive: 'bg-red-100 text-red-800'
    };
    
    const labels = {
      active: 'Aktif',
      warning: 'Uyarı',
      unassigned: 'Atanmamış',
      inactive: 'Pasif'
    };

    return (
      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${badges[status as keyof typeof badges]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  const getPerformanceBadge = (performance: string) => {
    const badges = {
      excellent: 'bg-green-100 text-green-800',
      good: 'bg-blue-100 text-blue-800',
      average: 'bg-yellow-100 text-yellow-800',
      poor: 'bg-red-100 text-red-800',
      not_rated: 'bg-gray-100 text-gray-800'
    };
    
    const labels = {
      excellent: 'Mükemmel',
      good: 'İyi',
      average: 'Orta',
      poor: 'Zayıf',
      not_rated: 'Değerlendirilmemiş'
    };

    return (
      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${badges[performance as keyof typeof badges]}`}>
        {labels[performance as keyof typeof labels]}
      </span>
    );
  };

  const filteredStudents = students.filter(student => {
    return (
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.number.includes(searchTerm)
    ) &&
    (classFilter === '' || student.class === classFilter) &&
    (statusFilter === '' || student.status === statusFilter);
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Öğrenci Listesi</h1>
          <p className="text-gray-600">Öğrencilerinizi yönetin ve performanslarını takip edin</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span>Toplu İşlemler</span>
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-2xl font-semibold text-gray-900">{students.length}</p>
              <p className="text-sm text-gray-600">Toplam Öğrenci</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-2xl font-semibold text-gray-900">
                {students.filter(s => s.status === 'active').length}
              </p>
              <p className="text-sm text-gray-600">Aktif</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-yellow-100 rounded-md flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-2xl font-semibold text-gray-900">
                {students.filter(s => s.status === 'warning').length}
              </p>
              <p className="text-sm text-gray-600">Uyarı</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center">
                <Users className="h-5 w-5 text-gray-600" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-2xl font-semibold text-gray-900">
                {students.filter(s => s.status === 'unassigned').length}
              </p>
              <p className="text-sm text-gray-600">Atanmamış</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Öğrenci ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={classFilter}
                onChange={(e) => setClassFilter(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Tüm Sınıflar</option>
                <option value="11-A">11-A</option>
                <option value="11-B">11-B</option>
                <option value="12-A">12-A</option>
              </select>
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Tüm Durumlar</option>
              <option value="active">Aktif</option>
              <option value="warning">Uyarı</option>
              <option value="unassigned">Atanmamış</option>
            </select>
          </div>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Öğrenciler ({filteredStudents.length})
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Öğrenci
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İletişim
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İşletme
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Durum
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performans
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Devam
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Son Ziyaret
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-600">
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{student.name}</div>
                        <div className="text-sm text-gray-500">{student.number} - {student.class}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 flex items-center">
                      <Phone className="h-4 w-4 mr-1" />
                      {student.phone}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center">
                      <Mail className="h-4 w-4 mr-1" />
                      {student.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {student.company ? (
                      <div>
                        <div className="text-sm font-medium text-gray-900 flex items-center">
                          <Building className="h-4 w-4 mr-1" />
                          {student.company}
                        </div>
                        <div className="text-sm text-gray-500">Süpervizör: {student.supervisor}</div>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">Atanmamış</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(student.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getPerformanceBadge(student.performance)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-12 h-2 bg-gray-200 rounded-full mr-2">
                        <div 
                          className={`h-2 rounded-full ${
                            student.attendanceRate >= 90 ? 'bg-green-500' :
                            student.attendanceRate >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${student.attendanceRate}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-900">{student.attendanceRate}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.lastVisit}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentList;