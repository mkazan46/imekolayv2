import React, { useState, useEffect } from 'react';
import { Plus, Search, Eye, Edit, Building2, Mail, Key, MapPin } from 'lucide-react';
import SchoolAddForm from './SchoolAddForm';

interface School {
  id: string;
  name: string;
  institutionCode: string;
  email: string;
  city: string;
  district: string;
  address: string;
  phone?: string;
  temporaryPassword?: string;
  isActive: boolean;
  createdAt: string;
}

const SchoolManagement: React.FC = () => {
  const [schools, setSchools] = useState<School[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [showCredentials, setShowCredentials] = useState<string | null>(null);

  useEffect(() => {
    fetchSchools();
  }, []);

  const fetchSchools = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/schools', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setSchools(data);
      } else {
        console.error('Failed to fetch schools');
      }
    } catch (error) {
      console.error('Error fetching schools:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSchoolAdded = (newSchool: School) => {
    setSchools(prev => [newSchool, ...prev]);
    setShowAddForm(false);
  };

  const filteredSchools = schools.filter(school =>
    school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    school.institutionCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    school.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleCredentials = (schoolId: string) => {
    setShowCredentials(showCredentials === schoolId ? null : schoolId);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Okul Yönetimi</h1>
          <p className="text-gray-600">Okulları ekleyin ve yönetin</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center space-x-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Yeni Okul Ekle</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
              <h3 className="text-lg font-medium text-gray-900">Aktif Okullar</h3>
              <p className="text-3xl font-bold text-green-600">
                {schools.filter(s => s.isActive).length}
              </p>
            </div>
            <Building2 className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Bu Ay Eklenen</h3>
              <p className="text-3xl font-bold text-purple-600">
                {schools.filter(s => {
                  const schoolDate = new Date(s.createdAt);
                  const now = new Date();
                  return schoolDate.getMonth() === now.getMonth() && 
                         schoolDate.getFullYear() === now.getFullYear();
                }).length}
              </p>
            </div>
            <Plus className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Okul adı, kurum kodu veya şehir ile ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent w-full"
          />
        </div>
      </div>

      {/* Schools List */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Okullar ({filteredSchools.length})</h2>
        </div>
        
        {filteredSchools.length === 0 ? (
          <div className="p-12 text-center">
            <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Henüz okul eklenmemiş</h3>
            <p className="text-gray-600 mb-4">İlk okulunuzu eklemek için yukarıdaki butonu kullanın.</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Okul Ekle
            </button>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredSchools.map((school) => (
              <div key={school.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{school.name}</h3>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        school.isActive ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'
                      }`}>
                        {school.isActive ? 'Aktif' : 'Pasif'}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Key className="w-4 h-4" />
                        <span>Kurum Kodu: <strong>{school.institutionCode}</strong></span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4" />
                        <span>{school.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span>{school.city} / {school.district}</span>
                      </div>
                    </div>
                    
                    {showCredentials === school.id && school.temporaryPassword && (
                      <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <h4 className="font-medium text-yellow-800 mb-2">Giriş Bilgileri:</h4>
                        <div className="space-y-1 text-sm">
                          <p><strong>Kurum Kodu:</strong> {school.institutionCode}</p>
                          <p><strong>E-posta:</strong> {school.email}</p>
                          <p><strong>Geçici Şifre:</strong> <code className="bg-yellow-100 px-2 py-1 rounded">{school.temporaryPassword}</code></p>
                        </div>
                        <p className="text-xs text-yellow-700 mt-2">
                          Bu bilgileri okul yöneticisine güvenli bir şekilde iletin.
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => toggleCredentials(school.id)}
                      className="text-purple-600 hover:text-purple-900 p-2 rounded-lg hover:bg-purple-50 transition-colors"
                      title="Giriş bilgilerini göster/gizle"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => console.log('Düzenleme özelliği yakında eklenecek')}
                      className="text-gray-400 cursor-not-allowed p-2 rounded-lg"
                      title="Düzenleme özelliği yakında eklenecek"
                      disabled
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add School Modal */}
      {showAddForm && (
        <SchoolAddForm
          onClose={() => setShowAddForm(false)}
          onSchoolAdded={handleSchoolAdded}
        />
      )}
    </div>
  );
};

export default SchoolManagement;