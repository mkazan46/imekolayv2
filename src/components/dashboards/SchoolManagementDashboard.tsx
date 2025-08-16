import React from 'react';
import { Routes, Route } from 'react-router-dom';

const SchoolManagementDashboard: React.FC = () => {
  return (
    <Routes>
      <Route index element={
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Okul Yönetim Paneli</h1>
            <p className="text-gray-600">Okul genelinde koordinatörlük faaliyetlerini yönetin</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900">Öğretmenler</h3>
              <p className="text-3xl font-bold text-blue-600">12</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900">Öğrenciler</h3>
              <p className="text-3xl font-bold text-green-600">280</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900">İşletmeler</h3>
              <p className="text-3xl font-bold text-orange-600">45</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900">Aktif Stajlar</h3>
              <p className="text-3xl font-bold text-purple-600">245</p>
            </div>
          </div>
        </div>
      } />
    </Routes>
  );
};

export default SchoolManagementDashboard;