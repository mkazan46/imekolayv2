import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { 
  Building2, 
  Users, 
  CheckCircle, 
  AlertCircle, 
  Search,
  Download,
  Eye,
  Edit,
  MoreHorizontal
} from 'lucide-react';
import SchoolManagement from '../vendor/SchoolManagement';

interface School {
  id: string;
  name: string;
  city: string;
  district: string;
  licenseStatus: 'active' | 'expired' | 'pending';
  licenseEnd: string;
  studentCount: number;
  lastActivity: string;
}

interface SupportTicket {
  id: string;
  school: string;
  subject: string;
  priority: 'high' | 'medium' | 'low';
  status: 'open' | 'in_progress' | 'resolved';
  createdAt: string;
}

const VendorDashboard: React.FC = () => {
  const [schools, setSchools] = useState<School[]>([]);
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    // Mock data - replace with real API calls
    setSchools([
      {
        id: '1',
        name: 'Atatürk Mesleki ve Teknik Anadolu Lisesi',
        city: 'İstanbul',
        district: 'Kadıköy',
        licenseStatus: 'active',
        licenseEnd: '2024-12-31',
        studentCount: 450,
        lastActivity: '2024-01-15'
      },
      {
        id: '2',
        name: 'Fatih Sultan Mehmet Anadolu Lisesi',
        city: 'Ankara',
        district: 'Çankaya',
        licenseStatus: 'active',
        licenseEnd: '2024-11-30',
        studentCount: 320,
        lastActivity: '2024-01-14'
      },
      {
        id: '3',
        name: 'Mimar Sinan Güzel Sanatlar Lisesi',
        city: 'İzmir',
        district: 'Konak',
        licenseStatus: 'expired',
        licenseEnd: '2024-01-10',
        studentCount: 280,
        lastActivity: '2024-01-10'
      }
    ]);

    setTickets([
      {
        id: '1',
        school: 'Atatürk Mesleki ve Teknik Anadolu Lisesi',
        subject: 'Öğrenci kayıt sorunu',
        priority: 'high',
        status: 'open',
        createdAt: '2024-01-15'
      },
      {
        id: '2',
        school: 'Fatih Sultan Mehmet Anadolu Lisesi',
        subject: 'Lisans yenileme talebi',
        priority: 'medium',
        status: 'in_progress',
        createdAt: '2024-01-14'
      }
    ]);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'expired': return 'text-red-600 bg-red-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredSchools = schools.filter(school => {
    const matchesSearch = school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         school.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || school.licenseStatus === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <Routes>
      <Route path="schools" element={<SchoolManagement />} />
      <Route index element={
        <div className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Satıcı Paneli</h1>
              <p className="text-gray-600">Okul lisanslarını ve destek taleplerini yönetin</p>
            </div>
            <div className="flex space-x-3">
              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center">
                <Download className="w-4 h-4 mr-2" />
                Rapor İndir
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Toplam Okul</h3>
                  <p className="text-3xl font-bold text-blue-600">{schools.length}</p>
                </div>
                <Building2 className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Aktif Lisans</h3>
                  <p className="text-3xl font-bold text-green-600">
                    {schools.filter(s => s.licenseStatus === 'active').length}
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Destek Talepleri</h3>
                  <p className="text-3xl font-bold text-orange-600">{tickets.length}</p>
                </div>
                <AlertCircle className="w-8 h-8 text-orange-600" />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Toplam Öğrenci</h3>
                  <p className="text-3xl font-bold text-purple-600">
                    {schools.reduce((sum, school) => sum + school.studentCount, 0)}
                  </p>
                </div>
                <Users className="w-8 h-8 text-purple-600" />
              </div>
            </div>
          </div>

          {/* Schools Table */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Okul Lisansları</h2>
              </div>
              
              {/* Search and Filter */}
              <div className="flex space-x-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Okul ara..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent w-full"
                  />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="all">Tüm Durumlar</option>
                  <option value="active">Aktif</option>
                  <option value="expired">Süresi Dolmuş</option>
                  <option value="pending">Beklemede</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Okul
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Konum
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Lisans Durumu
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Bitiş Tarihi
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Öğrenci Sayısı
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      İşlemler
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredSchools.map((school) => (
                    <tr key={school.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{school.name}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{school.city}</div>
                        <div className="text-sm text-gray-500">{school.district}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          getStatusColor(school.licenseStatus)
                        }`}>
                          {school.licenseStatus === 'active' ? 'Aktif' : 
                           school.licenseStatus === 'expired' ? 'Süresi Dolmuş' : 'Beklemede'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(school.licenseEnd).toLocaleDateString('tr-TR')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {school.studentCount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-purple-600 hover:text-purple-900">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="text-blue-600 hover:text-blue-900">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="text-gray-600 hover:text-gray-900">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Support Tickets */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Son Destek Talepleri</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {tickets.map((ticket) => (
                  <div key={ticket.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-sm font-medium text-gray-900">{ticket.subject}</h3>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          getPriorityColor(ticket.priority)
                        }`}>
                          {ticket.priority === 'high' ? 'Yüksek' : 
                           ticket.priority === 'medium' ? 'Orta' : 'Düşük'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{ticket.school}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(ticket.createdAt).toLocaleDateString('tr-TR')}
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        ticket.status === 'open' ? 'text-red-600 bg-red-100' :
                        ticket.status === 'in_progress' ? 'text-yellow-600 bg-yellow-100' :
                        'text-green-600 bg-green-100'
                      }`}>
                        {ticket.status === 'open' ? 'Açık' :
                         ticket.status === 'in_progress' ? 'İşlemde' : 'Çözüldü'}
                      </span>
                      <button className="text-purple-600 hover:text-purple-900 text-sm font-medium">
                        Görüntüle
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      } />
    </Routes>
  );
};

export default VendorDashboard;