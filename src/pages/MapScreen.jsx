import React, { useState } from 'react';
import { 
  Filter, List, Type, Clock, Users, Phone, MapPin, 
  ChevronRight, ArrowLeft, Calendar, CheckCircle, AlertCircle,
  Heart, Accessibility, Car, Wifi, Utensils, Truck, Info,
  Award, BookOpen, Home, Shield, X
} from 'lucide-react';

const MapScreen = () => {
  const [fontSize, setFontSize] = useState(16);
  const [currentView, setCurrentView] = useState('map'); // 'map' or 'detail'
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    availability: 'all',
    serviceType: 'all',
    ageGroup: 'all',
    hasParking: false,
    hasPickup: false,
    hasMeals: false,
    hasWifi: false,
    updateFreq: 'all',
    staffRatio: 'all'
  });

  // 狛江市の施設データ（マップ用に座標情報付き）
  const facilities = [
    {
      id: 1,
      name: 'あおぞら障害者グループホーム',
      serviceType: 'houkago_day',
      availability: 'available',
      availabilityText: '空きあり（2名）',
      lastUpdated: '2025年8月23日 14:30',
      updateFrequency: 'daily',
      address: '狛江市東和泉1-2-3',
      phone: '03-1234-5678',
      email: 'info@mirai-komae.jp',
      features: ['個別支援計画', '送迎サービス', 'SST', '学習支援', '創作活動'],
      matchScore: 95,
      openHours: '平日 14:00-18:00',
      holidayHours: '土日祝 10:00-16:00',
      capacity: '定員10名（現在8名利用中）',
      ageRange: '小学1年〜高校3年',
      specialties: ['発達障害', '知的障害'],
      hasParking: true,
      hasWifi: true,
      hasMeals: true,
      hasPickup: true,
      staffRatio: '利用者2名:職員1名',
      description: '一人ひとりの個性を大切にし、自立に向けた支援を行っています。',
      staff: '児童発達支援管理責任者、保育士、社会福祉士、言語聴覚士が在籍',
      programs: ['個別療育', 'グループ活動', '外出支援', '宿題サポート'],
      safety: ['AED設置', '防犯カメラ', '入退室管理システム'],
      achievements: ['療育実績15年', '利用者満足度98%', '職員研修年24回実施'],
      // マップ用座標（狛江市内の適当な位置）
      mapPosition: { top: '35%', left: '25%' }
    },
    {
      id: 2,
      name: 'あったかホームいぶき',
      serviceType: 'houkago_day',
      availability: 'waiting',
      availabilityText: '空き待ち（3名待ち）',
      lastUpdated: '2025年8月23日 09:15',
      updateFrequency: 'daily',
      address: '狛江市中和泉2-1-5',
      phone: '03-2345-6789',
      features: ['音楽療法', '運動療法', '集団活動', '個別相談'],
      matchScore: 88,
      openHours: '平日 15:00-18:00',
      capacity: '定員15名（現在15名利用中）',
      ageRange: '小学1年〜中学3年',
      specialties: ['発達障害', '身体障害'],
      hasParking: false,
      hasWifi: true,
      hasMeals: false,
      hasPickup: true,
      description: '音楽や運動を通じて、楽しみながら成長をサポートします。',
      mapPosition: { top: '55%', left: '60%' }
    },
    {
      id: 3,
      name: 'こまえケアサービス',
      serviceType: 'houkago_day',
      availability: 'limited',
      availabilityText: '要相談（週2-3日可）',
      lastUpdated: '2025年8月22日 16:45',
      updateFrequency: 'weekly',
      address: '狛江市西野川3-4-1',
      phone: '03-3456-7890',
      features: ['学習支援', '創作活動', '外出支援', '家族サポート'],
      matchScore: 82,
      openHours: '平日 14:30-17:30',
      capacity: '定員8名（現在6名利用中）',
      ageRange: '小学1年〜高校3年',
      specialties: ['知的障害', '精神障害'],
      hasParking: true,
      hasWifi: false,
      hasMeals: true,
      hasPickup: false,
      description: '少人数制でアットホームな環境での支援を心がけています。',
      mapPosition: { top: '70%', left: '40%' }
    }
  ];

  const filteredFacilities = facilities.filter(facility => {
    if (filters.availability !== 'all') {
      if (filters.availability === 'available' && facility.availability !== 'available') return false;
      if (filters.availability === 'waiting' && facility.availability !== 'waiting') return false;
      if (filters.availability === 'limited' && facility.availability !== 'limited') return false;
    }
    if (filters.serviceType !== 'all' && facility.serviceType !== filters.serviceType) return false;
    if (filters.updateFreq !== 'all' && facility.updateFrequency !== filters.updateFreq) return false;
    if (filters.hasParking && !facility.hasParking) return false;
    if (filters.hasPickup && !facility.hasPickup) return false;
    if (filters.hasWifi && !facility.hasWifi) return false;
    if (filters.hasMeals && !facility.hasMeals) return false;
    
    return true;
  });

  const toggleFontSize = () => {
    setFontSize(fontSize === 16 ? 20 : fontSize === 20 ? 24 : 16);
  };

  const getAvailabilityColor = (availability) => {
    switch (availability) {
      case 'available': return 'text-green-600 bg-green-50 border-green-200';
      case 'waiting': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'limited': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getAvailabilityIcon = (availability) => {
    switch (availability) {
      case 'available': return CheckCircle;
      case 'waiting': return Clock;
      case 'limited': return AlertCircle;
      default: return Clock;
    }
  };

  const getServiceTypeLabel = (serviceType) => {
    const types = {
      'houkago_day': '放課後等デイサービス',
      'seikatsu_kaigo': '生活介護',
      'syuro_b': '就労継続支援B型',
      'syuro_a': '就労継続支援A型',
      'tanki_nyusyo': '短期入所'
    };
    return types[serviceType] || serviceType;
  };

  const getMarkerColor = (availability, matchScore) => {
    if (matchScore >= 90) return 'bg-gradient-to-r from-green-500 to-green-600';
    if (matchScore >= 80) return 'bg-gradient-to-r from-blue-500 to-blue-600';
    return 'bg-gradient-to-r from-gray-500 to-gray-600';
  };

  // リストモードに切り替える関数（実装では親コンポーネントで処理）
  const switchToList = () => {
    alert('リストモードに切り替えます');
  };

  if (currentView === 'detail' && selectedFacility) {
    return (
      <div className="min-h-screen bg-gray-50" style={{ fontSize: `${fontSize}px` }}>
        {/* ヘッダー */}
        <div className="bg-white shadow-sm border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setCurrentView('map')}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                aria-label="マップに戻る"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-800">施設詳細</h1>
                <p className="text-sm text-gray-600">{selectedFacility.name}</p>
              </div>
            </div>
            <button
              onClick={toggleFontSize}
              className="flex items-center space-x-1 px-2.5 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors whitespace-nowrap text-sm font-medium"
              aria-label={`文字サイズを変更（現在${fontSize}px）`}
            >
              <Type className="w-4 h-4" />
              <span>文字</span>
            </button>
          </div>
        </div>

        {/* 詳細コンテンツ（簡略版） */}
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h2 className="text-2xl font-bold text-gray-800">{selectedFacility.name}</h2>
                    <span className="px-3 py-1 bg-gradient-to-r from-indigo-100 to-blue-100 text-indigo-700 rounded-full text-sm font-medium border border-indigo-200">
                      {getServiceTypeLabel(selectedFacility.serviceType)}
                    </span>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4">{selectedFacility.description}</p>
                  
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className={`inline-flex items-center px-3 py-2 rounded-lg border font-semibold ${getAvailabilityColor(selectedFacility.availability)}`}>
                        {React.createElement(getAvailabilityIcon(selectedFacility.availability), { className: "w-4 h-4 mr-2" })}
                        {selectedFacility.availabilityText}
                      </div>
                      <div className="text-sm text-gray-600">
                        <Info className="w-4 h-4 inline mr-1" />
                        最終更新: {selectedFacility.lastUpdated}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="lg:text-right flex-shrink-0">
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">{selectedFacility.matchScore}%</div>
                  <div className="text-sm text-gray-600 mb-4">マッチ度</div>
                  
                  <div className="space-y-2">
                    <button className="w-full lg:w-auto bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-green-300">
                      <Calendar className="inline mr-2 w-4 h-4" />
                      見学予約
                    </button>
                    <button className="w-full lg:w-auto bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-lg text-sm hover:from-blue-600 hover:to-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300">
                      資料請求
                    </button>
                    <div className="text-xs text-gray-500 mt-2">
                      <Phone className="inline w-3 h-3 mr-1" />
                      {selectedFacility.phone}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 relative" style={{ fontSize: `${fontSize}px` }}>
      {/* ヘッダー */}
      <div className="bg-white shadow-sm border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-sm">
              <CheckCircle className="text-white w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-gray-600">マップで表示中</p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center space-x-1 px-2.5 py-2 rounded-lg transition-colors whitespace-nowrap text-sm font-medium ${showFilters ? 'text-blue-700 bg-blue-50 border border-blue-200' : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'}`}
              aria-label="フィルター設定"
            >
              <Filter className="w-4 h-4" />
              <span>フィルター</span>
            </button>
            <button
              onClick={switchToList}
              className="flex items-center space-x-1 px-2.5 py-2 text-green-700 bg-green-50 border border-green-200 rounded-lg transition-colors whitespace-nowrap text-sm font-medium hover:bg-green-100"
              aria-label="リスト表示"
            >
              <List className="w-4 h-4" />
              <span>リスト</span>
            </button>
            <button
              onClick={toggleFontSize}
              className="flex items-center space-x-1 px-2.5 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors whitespace-nowrap text-sm font-medium"
              aria-label={`文字サイズを変更（現在${fontSize}px）`}
            >
              <Type className="w-4 h-4" />
              <span>文字</span>
            </button>
          </div>
        </div>
      </div>

      {/* フィルターパネル */}
      {showFilters && (
        <div className="absolute top-14 left-0 right-0 bg-white border-b border-gray-200 shadow-lg px-4 py-6 z-50 animate-in slide-in-from-top duration-300">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">詳細フィルター</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">空き状況</label>
                <select
                  value={filters.availability}
                  onChange={(e) => setFilters({...filters, availability: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
                >
                  <option value="all">すべて表示</option>
                  <option value="available">空きあり</option>
                  <option value="waiting">空き待ち</option>
                  <option value="limited">要相談</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">サービス種別</label>
                <select
                  value={filters.serviceType}
                  onChange={(e) => setFilters({...filters, serviceType: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
                >
                  <option value="all">すべて表示</option>
                  <option value="houkago_day">放課後等デイサービス</option>
                  <option value="seikatsu_kaigo">生活介護</option>
                  <option value="syuro_b">就労継続支援B型</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">情報更新頻度</label>
                <select
                  value={filters.updateFreq}
                  onChange={(e) => setFilters({...filters, updateFreq: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
                >
                  <option value="all">すべて表示</option>
                  <option value="daily">毎日更新</option>
                  <option value="weekly">週1回更新</option>
                </select>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">設備・サービス</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <label className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.hasParking}
                    onChange={(e) => setFilters({...filters, hasParking: e.target.checked})}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-300 border-gray-300 rounded"
                  />
                  <Car className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium">駐車場</span>
                </label>
                <label className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.hasPickup}
                    onChange={(e) => setFilters({...filters, hasPickup: e.target.checked})}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-300 border-gray-300 rounded"
                  />
                  <Truck className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium">送迎サービス</span>
                </label>
                <label className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.hasMeals}
                    onChange={(e) => setFilters({...filters, hasMeals: e.target.checked})}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-300 border-gray-300 rounded"
                  />
                  <Utensils className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium">食事提供</span>
                </label>
                <label className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.hasWifi}
                    onChange={(e) => setFilters({...filters, hasWifi: e.target.checked})}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-300 border-gray-300 rounded"
                  />
                  <Wifi className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium">Wi-Fi</span>
                </label>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setFilters({
                  availability: 'all',
                  serviceType: 'all',
                  ageGroup: 'all',
                  hasParking: false,
                  hasPickup: false,
                  hasMeals: false,
                  hasWifi: false,
                  updateFreq: 'all',
                  staffRatio: 'all'
                })}
                className="px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm font-medium"
              >
                フィルターをリセット
              </button>
            </div>
          </div>
        </div>
      )}

      {/* マップエリア */}
      <div className="flex-1 relative">
        <div className="h-[calc(100vh-4rem)] bg-gray-200 relative overflow-hidden">
          {/* 地図プレースホルダー */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
            <div className="text-center">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <MapPin className="w-12 h-12 text-gray-400" />
              </div>
              <p className="text-lg font-semibold text-gray-600 mb-2">狛江市マップ</p>
              <p className="text-sm text-gray-500">※ここに実際の地図が表示されます</p>
            </div>
          </div>

          {/* 施設マーカー */}
          {filteredFacilities.map((facility) => (
            <button
              key={facility.id}
              onClick={() => {
                setSelectedFacility(facility);
                setCurrentView('detail');
              }}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300 ${getMarkerColor(facility.availability, facility.matchScore)}`}
              style={{ 
                top: facility.mapPosition.top, 
                left: facility.mapPosition.left 
              }}
              aria-label={`${facility.name} - ${facility.availabilityText}`}
            >
              <div className="w-full h-full flex items-center justify-center text-white font-bold text-sm">
                {facility.matchScore}
              </div>
              
              {/* ツールチップ */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <div className="bg-white rounded-lg shadow-lg p-3 min-w-64 border border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-1">{facility.name}</h4>
                  <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold mb-2 ${getAvailabilityColor(facility.availability)}`}>
                    {React.createElement(getAvailabilityIcon(facility.availability), { className: "w-3 h-3 mr-1" })}
                    {facility.availabilityText}
                  </div>
                  <p className="text-sm text-gray-600">{facility.address}</p>
                  <p className="text-xs text-gray-500 mt-1">クリックで詳細表示</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* 凡例 */}
        <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-4 border border-gray-200">
          <h3 className="font-semibold text-gray-800 mb-3">マーカーの見方</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center text-white text-xs font-bold">90</div>
              <span className="text-sm text-gray-700">マッチ度90%以上</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">80</div>
              <span className="text-sm text-gray-700">マッチ度80%以上</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-r from-gray-500 to-gray-600 rounded-full flex items-center justify-center text-white text-xs font-bold">70</div>
              <span className="text-sm text-gray-700">マッチ度80%未満</span>
            </div>
          </div>
        </div>

        {/* 施設情報サイドパネル（選択時） */}
        {selectedFacility && currentView === 'map' && (
          <div className="absolute bottom-4 left-4 right-4 lg:right-auto lg:w-96 bg-white rounded-2xl shadow-xl border border-gray-200 p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-800 mb-1">{selectedFacility.name}</h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 bg-gradient-to-r from-indigo-100 to-blue-100 text-indigo-700 rounded-full text-xs font-medium border border-indigo-200">
                    {getServiceTypeLabel(selectedFacility.serviceType)}
                  </span>
                  <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold border ${getAvailabilityColor(selectedFacility.availability)}`}>
                    {React.createElement(getAvailabilityIcon(selectedFacility.availability), { className: "w-3 h-3 mr-1" })}
                    {selectedFacility.availabilityText}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="text-right">
                  <div className="text-lg font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">{selectedFacility.matchScore}%</div>
                  <div className="text-xs text-gray-600">マッチ度</div>
                </div>
                <button
                  onClick={() => setSelectedFacility(null)}
                  className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <p className="text-sm text-gray-700 mb-3">{selectedFacility.description}</p>
            
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-4">
              <div className="flex items-center space-x-1">
                <MapPin className="w-3 h-3" />
                <span>{selectedFacility.address}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>{selectedFacility.openHours}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-3 h-3" />
                <span>{selectedFacility.capacity}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Info className="w-3 h-3" />
                <span>更新: {selectedFacility.lastUpdated.split(' ')[0]}</span>
              </div>
            </div>

            {/* 設備アイコン */}
            <div className="flex items-center space-x-2 mb-4">
              {selectedFacility.hasParking && (
                <div className="flex items-center space-x-1 text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-200">
                  <Car className="w-3 h-3" />
                  <span className="text-xs font-medium">駐車場</span>
                </div>
              )}
              {selectedFacility.hasPickup && (
                <div className="flex items-center space-x-1 text-blue-600 bg-blue-50 px-2 py-1 rounded-md border border-blue-200">
                  <Truck className="w-3 h-3" />
                  <span className="text-xs font-medium">送迎</span>
                </div>
              )}
              {selectedFacility.hasMeals && (
                <div className="flex items-center space-x-1 text-amber-600 bg-amber-50 px-2 py-1 rounded-md border border-amber-200">
                  <Utensils className="w-3 h-3" />
                  <span className="text-xs font-medium">食事</span>
                </div>
              )}
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentView('detail')}
                className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-3 rounded-lg text-sm font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                詳細を見る
                <ChevronRight className="inline ml-1 w-3 h-3" />
              </button>
              <button className="bg-gradient-to-r from-green-500 to-green-600 text-white py-2 px-3 rounded-lg text-sm font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-300">
                <Calendar className="inline mr-1 w-3 h-3" />
                見学予約
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapScreen;