import React, { useState } from 'react';
import { Plus, FileText, Edit, Trash2, Eye, Calendar, Filter, Search } from 'lucide-react';

const CoordinationForms: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedForm, setSelectedForm] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const forms = [
    {
      id: 1,
      title: 'Günlük Koordinatörlük Raporu - 15.01.2024',
      date: '2024-01-15',
      status: 'completed',
      studentCount: 8,
      company: 'ABC Teknoloji A.Ş.',
      lastModified: '2024-01-15 16:30'
    },
    {
      id: 2,
      title: 'Haftalık Değerlendirme - 08-12.01.2024',
      date: '2024-01-12',
      status: 'draft',
      studentCount: 12,
      company: 'XYZ Bilişim Ltd.',
      lastModified: '2024-01-12 14:20'
    },
    {
      id: 3,
      title: 'Aylık Genel Rapor - Aralık 2023',
      date: '2023-12-30',
      status: 'submitted',
      studentCount: 25,
      company: 'Çoklu İşletme',
      lastModified: '2023-12-30 09:15'
    }
  ];

  const getStatusBadge = (status: string) => {
    const badges = {
      completed: 'bg-green-100 text-green-800',
      draft: 'bg-yellow-100 text-yellow-800',
      submitted: 'bg-blue-100 text-blue-800'
    };
    
    const labels = {
      completed: 'Tamamlandı',
      draft: 'Taslak',
      submitted: 'Gönderildi'
    };

    return (
      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${badges[status as keyof typeof badges]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Koordinatörlük Formları</h1>
          <p className="text-gray-600">Günlük ve haftalık koordinatörlük raporlarınızı yönetin</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Yeni Form</span>
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Form ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">Tüm Durumlar</option>
                <option value="draft">Taslak</option>
                <option value="completed">Tamamlandı</option>
                <option value="submitted">Gönderildi</option>
              </select>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-gray-400" />
            <input
              type="date"
              className="border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Forms List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Formlar ({forms.length})</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {forms.map((form) => (
            <div key={form.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-blue-500" />
                    <h4 className="text-lg font-medium text-gray-900">{form.title}</h4>
                    {getStatusBadge(form.status)}
                  </div>
                  <div className="mt-2 flex items-center space-x-6 text-sm text-gray-500">
                    <span>Tarih: {form.date}</span>
                    <span>Öğrenci Sayısı: {form.studentCount}</span>
                    <span>İşletme: {form.company}</span>
                    <span>Son Güncelleme: {form.lastModified}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-md">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-green-600 hover:bg-green-100 rounded-md">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-red-600 hover:bg-red-100 rounded-md">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-2xl font-semibold text-gray-900">24</p>
              <p className="text-sm text-gray-600">Toplam Form</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-yellow-100 rounded-md flex items-center justify-center">
                <Edit className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-2xl font-semibold text-gray-900">3</p>
              <p className="text-sm text-gray-600">Taslak</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center">
                <FileText className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-2xl font-semibold text-gray-900">18</p>
              <p className="text-sm text-gray-600">Tamamlandı</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-purple-100 rounded-md flex items-center justify-center">
                <Calendar className="h-5 w-5 text-purple-600" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-2xl font-semibold text-gray-900">5</p>
              <p className="text-sm text-gray-600">Bu Hafta</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoordinationForms;