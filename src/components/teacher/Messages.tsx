import React, { useState } from 'react';
import { MessageCircle, Send, Paperclip, Search, Filter, Bell, Star } from 'lucide-react';

const Messages: React.FC = () => {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const messages = [
    {
      id: 1,
      sender: 'Okul Yönetimi',
      subject: 'Koordinatörlük Toplantısı',
      preview: 'Bu ayın koordinatörlük toplantısı 20 Ocak Pazartesi günü...',
      content: 'Bu ayın koordinatörlük toplantısı 20 Ocak Pazartesi günü saat 14:00\'te konferans salonunda yapılacaktır. Tüm koordinatör öğretmenlerin katılımı zorunludur.',
      date: '2024-01-15',
      time: '14:30',
      read: false,
      important: true,
      type: 'announcement'
    },
    {
      id: 2,
      sender: 'Mehmet Yönetici',
      subject: 'Form Eksikleri',
      preview: 'Koordinatörlük formlarınızda bazı eksiklikler tespit edildi...',
      content: 'Merhaba Ahmet Hoca, son gönderdiğiniz koordinatörlük formlarında bazı eksiklikler tespit edilmiştir. Lütfen öğrenci devam durumları kısmını tekrar kontrol ediniz.',
      date: '2024-01-14',
      time: '09:15',
      read: true,
      important: false,
      type: 'personal'
    },
    {
      id: 3,
      sender: 'Sistem',
      subject: 'Hatırlatma: Aylık Rapor Teslimi',
      preview: 'Aylık koordinatörlük raporunuzun teslim tarihi yaklaşıyor...',
      content: 'Aylık koordinatörlük raporunuzun teslim tarihi 25 Ocak\'tır. Lütfen raporunuzu zamanında sisteme yüklemeyi unutmayınız.',
      date: '2024-01-13',
      time: '16:00',
      read: true,
      important: false,
      type: 'system'
    },
    {
      id: 4,
      sender: 'ABC Teknoloji A.Ş.',
      subject: 'Stajyer Değerlendirme',
      preview: 'Ahmet Yılmaz\'ın staj performansı hakkında...',
      content: 'Merhaba, işletmemizde staj yapan Ahmet Yılmaz\'ın performansı oldukça tatmin edici. Kendisi teknik konularda başarılı ve uyumlu çalışıyor.',
      date: '2024-01-12',
      time: '11:45',
      read: false,
      important: false,
      type: 'company'
    }
  ];

  const getMessageTypeIcon = (type: string) => {
    switch (type) {
      case 'announcement':
        return <Bell className="h-4 w-4 text-blue-500" />;
      case 'system':
        return <MessageCircle className="h-4 w-4 text-gray-500" />;
      case 'company':
        return <MessageCircle className="h-4 w-4 text-green-500" />;
      default:
        return <MessageCircle className="h-4 w-4 text-purple-500" />;
    }
  };

  const unreadCount = messages.filter(m => !m.read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mesajlar ve Duyurular</h1>
          <p className="text-gray-600">Okul yönetimi ve işletmelerden gelen mesajlarınız</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2">
            <MessageCircle className="h-4 w-4" />
            <span>Yeni Mesaj</span>
          </button>
        </div>
      </div>

      {/* Message Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
                <MessageCircle className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-2xl font-semibold text-gray-900">{messages.length}</p>
              <p className="text-sm text-gray-600">Toplam Mesaj</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-red-100 rounded-md flex items-center justify-center">
                <Bell className="h-5 w-5 text-red-600" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-2xl font-semibold text-gray-900">{unreadCount}</p>
              <p className="text-sm text-gray-600">Okunmamış</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-yellow-100 rounded-md flex items-center justify-center">
                <Star className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-2xl font-semibold text-gray-900">
                {messages.filter(m => m.important).length}
              </p>
              <p className="text-sm text-gray-600">Önemli</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center">
                <MessageCircle className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-2xl font-semibold text-gray-900">3</p>
              <p className="text-sm text-gray-600">Bu Hafta</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Message List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center space-x-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Mesaj ara..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <Filter className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  onClick={() => setSelectedMessage(message)}
                  className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${
                    !message.read ? 'bg-blue-50' : ''
                  } ${selectedMessage?.id === message.id ? 'bg-blue-100' : ''}`}
                >
                  <div className="flex items-start space-x-3">
                    {getMessageTypeIcon(message.type)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className={`text-sm font-medium ${!message.read ? 'text-gray-900' : 'text-gray-700'}`}>
                          {message.sender}
                        </p>
                        <div className="flex items-center space-x-1">
                          {message.important && <Star className="h-3 w-3 text-yellow-400 fill-current" />}
                          <span className="text-xs text-gray-500">{message.time}</span>
                        </div>
                      </div>
                      <p className={`text-sm ${!message.read ? 'font-medium text-gray-900' : 'text-gray-600'}`}>
                        {message.subject}
                      </p>
                      <p className="text-xs text-gray-500 mt-1 truncate">
                        {message.preview}
                      </p>
                    </div>
                  </div>
                  {!message.read && (
                    <div className="absolute left-2 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-blue-500 rounded-full"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Message Content */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow h-full">
            {selectedMessage ? (
              <div className="p-6">
                <div className="border-b border-gray-200 pb-4 mb-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900">
                      {selectedMessage.subject}
                    </h2>
                    {selectedMessage.important && (
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    )}
                  </div>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                    <span>Gönderen: {selectedMessage.sender}</span>
                    <span>{selectedMessage.date} - {selectedMessage.time}</span>
                  </div>
                </div>
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed">{selectedMessage.content}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-2">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2">
                      <Send className="h-4 w-4" />
                      <span>Yanıtla</span>
                    </button>
                    <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200">
                      İlet
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Bir mesaj seçin</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Compose */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Hızlı Mesaj</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select className="border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="">Alıcı seçin...</option>
              <option value="admin">Okul Yönetimi</option>
              <option value="teacher">Diğer Öğretmenler</option>
              <option value="company">İşletme</option>
            </select>
            <input
              type="text"
              placeholder="Konu"
              className="border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Mesajınızı yazın..."
            rows={4}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <div className="flex items-center justify-between">
            <button className="flex items-center space-x-2 text-gray-500 hover:text-gray-700">
              <Paperclip className="h-4 w-4" />
              <span>Dosya Ekle</span>
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2">
              <Send className="h-4 w-4" />
              <span>Gönder</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;