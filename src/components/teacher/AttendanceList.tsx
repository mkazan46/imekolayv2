import React, { useState } from 'react';
import { UserCheck, UserX, Search, Filter, Download, Calendar } from 'lucide-react';

const AttendanceList: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchTerm, setSearchTerm] = useState('');
  
  const students = [
    {
      id: 1,
      name: 'Ahmet Yılmaz',
      number: '101',
      class: '11-A',
      company: 'ABC Teknoloji A.Ş.',
      status: 'present',
      note: ''
    },
    {
      id: 2,
      name: 'Ayşe Kaya',
      number: '102',
      class: '11-A',
      company: 'XYZ Bilişim Ltd.',
      status: 'absent',
      note: 'Sağlık raporu'
    },
    {
      id: 3,
      name: 'Mehmet Demir',
      number: '103',
      class: '11-A',
      company: 'TechSoft A.Ş.',
      status: 'present',
      note: ''
    },
    {
      id: 4,
      name: 'Fatma Özkan',
      number: '104',
      class: '11-B',
      company: 'Digital Solutions',
      status: 'late',
      note: '30 dk geç geldi'
    },
    {
      id: 5,
      name: 'Ali Çetin',
      number: '105',
      class: '11-B',
      company: 'Smart Tech',
      status: 'present',
      note: ''
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <UserCheck className="h-5 w-5 text-green-600" />;
      case 'absent':
        return <UserX className="h-5 w-5 text-red-600" />;
      case 'late':
        return <UserCheck className="h-5 w-5 text-yellow-600" />;
      default:
        return <UserX className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      present: 'bg-green-100 text-green-800',
      absent: 'bg-red-100 text-red-800',
      late: 'bg-yellow-100 text-yellow-800'
    };
    
    const labels = {
      present: 'Geldi',
      absent: 'Gelmedi',
      late: 'Geç Geldi'
    };

    return (
      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${badges[status as keyof typeof badges]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  const attendanceStats = {
    total: students.length,
    present: students.filter(s => s.status === 'present').length,
    absent: students.filter(s => s.status === 'absent').length,
    late: students.filter(s => s.status === 'late').length
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Devam-Devamsızlık Listesi</h1>
          <p className="text-gray-600">Öğrencilerin devam durumunu takip edin ve yönetin</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Excel İndir</span>
          </button>
          <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>PDF İndir</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
                <UserCheck className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-2xl font-semibold text-gray-900">{attendanceStats.total}</p>
              <p className="text-sm text-gray-600">Toplam Öğrenci</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center">
                <UserCheck className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-2xl font-semibold text-gray-900">{attendanceStats.present}</p>
              <p className="text-sm text-gray-600">Geldi</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-red-100 rounded-md flex items-center justify-center">
                <UserX className="h-5 w-5 text-red-600" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-2xl font-semibold text-gray-900">{attendanceStats.absent}</p>
              <p className="text-sm text-gray-600">Gelmedi</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-yellow-100 rounded-md flex items-center justify-center">
                <UserCheck className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-2xl font-semibold text-gray-900">{attendanceStats.late}</p>
              <p className="text-sm text-gray-600">Geç Geldi</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Controls */}
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
              <select className="border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="">Tüm Sınıflar</option>
                <option value="11-A">11-A</option>
                <option value="11-B">11-B</option>
                <option value="12-A">12-A</option>
              </select>
            </div>
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
      </div>

      {/* Attendance Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Devam Listesi - {new Date(selectedDate).toLocaleDateString('tr-TR')}
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
                  Numara
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sınıf
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İşletme
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Durum
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Not
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(student.status)}
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{student.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {student.number}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {student.class}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {student.company}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(student.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.note || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-green-600 hover:text-green-900">Geldi</button>
                      <button className="text-red-600 hover:text-red-900">Gelmedi</button>
                      <button className="text-yellow-600 hover:text-yellow-900">Geç</button>
                    </div>
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

export default AttendanceList;