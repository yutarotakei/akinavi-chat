import React, { useState, useEffect } from 'react';
import { 
  Filter, Map, Type, Clock, Users, Phone, MapPin, 
  ChevronRight, ArrowLeft, Calendar, CheckCircle, AlertCircle,
  Heart, Accessibility, Car, Wifi, Utensils, Truck, Info,
  Award, BookOpen, Activity, Home, Shield
} from 'lucide-react';

const ResultsScreen = () => {
  const [fontSize, setFontSize] = useState(16);
  const [currentView, setCurrentView] = useState('list'); // 'list' or 'detail'
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

  // 狛江市のすべての施設データ（マッチ度順）
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
      website: 'https://mirai-komae.jp',
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
      description: '一人ひとりの個性を大切にし、自立に向けた支援を行っています。専門的な療育プログラムと楽しい活動を通じて、お子様の成長をサポートします。',
      staff: '児童発達支援管理責任者、保育士、社会福祉士、言語聴覚士が在籍',
      programs: ['個別療育', 'グループ活動', '外出支援', '宿題サポート'],
      safety: ['AED設置', '防犯カメラ', '入退室管理システム'],
      achievements: ['療育実績15年', '利用者満足度98%', '職員研修年24回実施'],
      todaySchedule: '14:00 到着・健康チェック → 14:30 宿題タイム → 15:30 おやつ → 16:00 療育活動 → 17:30 帰宅準備',
      monthlyEvents: ['誕生日会', '避難訓練', '保護者懇談会', '外出活動']
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
      email: 'contact@niji-komae.jp',
      website: 'https://niji-komae.jp',
      features: ['音楽療法', '運動療法', '集団活動', '個別相談'],
      matchScore: 88,
      openHours: '平日 15:00-18:00',
      holidayHours: '土曜 10:00-15:00',
      capacity: '定員15名（現在15名利用中）',
      ageRange: '小学1年〜中学3年',
      specialties: ['発達障害', '身体障害'],
      hasParking: false,
      hasWifi: true,
      hasMeals: false,
      hasPickup: true,
      staffRatio: '利用者3名:職員1名',
      description: '音楽や運動を通じて、楽しみながら成長をサポートします。豊富な療育プログラムで、お子様の可能性を最大限に引き出します。',
      staff: '理学療法士、音楽療法士、保育士、作業療法士が在籍',
      programs: ['音楽療法', 'リトミック', '運動療法', '感覚統合'],
      safety: ['AED設置', '看護師常駐', 'アレルギー対応'],
      achievements: ['音楽療法士資格者3名在籍', '運動療法実績10年'],
      todaySchedule: '15:00 到着 → 15:30 音楽活動 → 16:30 運動療法 → 17:30 帰宅準備',
      monthlyEvents: ['音楽発表会', 'スポーツデー', '家族参観日']
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
      email: 'info@himawari-komae.or.jp',
      website: 'https://himawari-komae.or.jp',
      features: ['学習支援', '創作活動', '外出支援', '家族サポート'],
      matchScore: 82,
      openHours: '平日 14:30-17:30',
      holidayHours: '土曜 13:00-17:00',
      capacity: '定員8名（現在6名利用中）',
      ageRange: '小学1年〜高校3年',
      specialties: ['知的障害', '精神障害'],
      hasParking: true,
      hasWifi: false,
      hasMeals: true,
      hasPickup: false,
      staffRatio: '利用者2名:職員1名',
      description: '少人数制でアットホームな環境での支援を心がけています。家庭的な雰囲気の中で、お子様が安心して過ごせる場所を提供しています。',
      staff: '社会福祉士、精神保健福祉士、教員免許保持者が在籍',
      programs: ['学習サポート', '創作活動', '料理体験', '社会体験'],
      safety: ['少人数制', '家庭的環境', '個別対応重視'],
      achievements: ['アットホーム環境', '個別対応実績豊富'],
      todaySchedule: '14:30 到着 → 15:00 学習時間 → 16:00 創作活動 → 17:00 掃除・帰宅準備',
      monthlyEvents: ['料理教室', '図書館見学', '季節のイベント']
    }
  ];

  const filteredFacilities = facilities.filter(facility => {
    if (filters.availability !== 'all') {
      if (filters.availability === 'available' && facility.availability !== 'available') return false;
      if (filters.availability === 'waiting' && facility.availability !== 'waiting') return false;
      if (filters.availability === 'limited' && facility.availability !== 'limited') return false;
    }
    if (filters.serviceType !== 'all' && facility.serviceType !== filters.serviceType) return false;
    if (filters.ageGroup !== 'all') {
      if (filters.ageGroup === 'child' && !facility.ageRange.includes('小学')) return false;
      if (filters.ageGroup === 'adult' && !facility.ageRange.includes('18歳')) return false;
    }
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

  if (currentView === 'detail' && selectedFacility) {
    return (
      <div className="min-h-screen bg-gray-50" style={{ fontSize: `${fontSize}px` }}>
        {/* ヘッダー */}
        <div className="bg-white shadow-sm border-b border-gray-200 px-4 py-4">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setCurrentView('list')}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                aria-label="一覧に戻る"
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
              className="flex items-center space-x-1 px-2 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors whitespace-nowrap"
              aria-label={`文字サイズを変更（現在${fontSize}px）`}
            >
              <Type className="w-4 h-4" />
              <span className="text-sm font-medium hidden sm:inline">文字サイズ</span>
            </button>
          </div>
        </div>

        {/* 詳細コンテンツ */}
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* 施設ヘッダー */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h2 className="text-2xl font-bold text-gray-800">{selectedFacility.name}</h2>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      {getServiceTypeLabel(selectedFacility.serviceType)}
                    </span>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4">{selectedFacility.description}</p>
                  
                  {/* 空き情報と更新日時 */}
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
                  <div className="text-3xl font-bold text-blue-600">{selectedFacility.matchScore}%</div>
                  <div className="text-sm text-gray-600 mb-4">マッチ度</div>
                  
                  {/* メインアクションボタン */}
                  <div className="space-y-2">
                    <button className="w-full lg:w-auto bg-green-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-green-600 transition-colors focus:outline-none focus:ring-4 focus:ring-green-300">
                      <Calendar className="inline mr-2 w-4 h-4" />
                      見学予約
                    </button>
                    <button className="w-full lg:w-auto bg-blue-500 text-white py-2 px-4 rounded-lg text-sm hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300">
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

            {/* 基本情報 */}
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Info className="w-5 h-5 mr-2 text-blue-500" />
                基本情報
              </h3>
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-gray-800">住所</div>
                      <div className="text-gray-600">{selectedFacility.address}</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-gray-800">営業時間</div>
                      <div className="text-gray-600">{selectedFacility.openHours}</div>
                      <div className="text-gray-600">{selectedFacility.holidayHours}</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Users className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-gray-800">定員・対象年齢</div>
                      <div className="text-gray-600">{selectedFacility.capacity}</div>
                      <div className="text-gray-600">{selectedFacility.ageRange}</div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Accessibility className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-gray-800">対象障害</div>
                      <div className="text-gray-600">{selectedFacility.specialties.join('、')}</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Heart className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-gray-800">職員体制</div>
                      <div className="text-gray-600">{selectedFacility.staffRatio}</div>
                      <div className="text-gray-600 text-sm mt-1">{selectedFacility.staff}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* プログラム・サービス */}
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-green-500" />
                プログラム・サービス
              </h3>
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">主なプログラム</h4>
                  <div className="space-y-1">
                    {selectedFacility.programs.map((program, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-gray-700">{program}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">特色・特徴</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedFacility.features.map((feature, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* 1日のスケジュール */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-blue-600" />
                  1日のスケジュール例
                </h4>
                <p className="text-gray-700 text-sm leading-relaxed">{selectedFacility.todaySchedule}</p>
              </div>
            </div>

            {/* 設備・環境 */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Home className="w-5 h-5 mr-2 text-purple-500" />
                設備・環境
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className={`flex items-center space-x-2 p-3 rounded-lg ${selectedFacility.hasParking ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-gray-50 text-gray-500'}`}>
                  <Car className="w-5 h-5" />
                  <span className="text-sm font-medium">駐車場</span>
                </div>
                <div className={`flex items-center space-x-2 p-3 rounded-lg ${selectedFacility.hasPickup ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-gray-50 text-gray-500'}`}>
                  <Truck className="w-5 h-5" />
                  <span className="text-sm font-medium">送迎</span>
                </div>
                <div className={`flex items-center space-x-2 p-3 rounded-lg ${selectedFacility.hasWifi ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-gray-50 text-gray-500'}`}>
                  <Wifi className="w-5 h-5" />
                  <span className="text-sm font-medium">Wi-Fi</span>
                </div>
                <div className={`flex items-center space-x-2 p-3 rounded-lg ${selectedFacility.hasMeals ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-gray-50 text-gray-500'}`}>
                  <Utensils className="w-5 h-5" />
                  <span className="text-sm font-medium">食事提供</span>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                    <Shield className="w-4 h-4 mr-2 text-red-500" />
                    安全・安心への取り組み
                  </h4>
                  <div className="space-y-1">
                    {selectedFacility.safety.map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-red-500" />
                        <span className="text-gray-700 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                    <Award className="w-4 h-4 mr-2 text-yellow-500" />
                    実績・特徴
                  </h4>
                  <div className="space-y-1">
                    {selectedFacility.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Award className="w-4 h-4 text-yellow-500" />
                        <span className="text-gray-700 text-sm">{achievement}</span>
                      </div>
                    ))}
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
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-sm">
              <CheckCircle className="text-white w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-gray-600">マッチ度順に表示中</p>
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
              className="flex items-center space-x-1 px-2.5 py-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors whitespace-nowrap text-sm font-medium"
              aria-label="マップ表示"
            >
              <Map className="w-4 h-4" />
              <span>マップ</span>
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
          <div className="max-w-4xl mx-auto">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">詳細フィルター</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* 空き状況 */}
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

              {/* サービス種別 */}
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

              {/* 情報更新頻度 */}
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

            {/* 設備・サービス */}
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

            {/* フィルターリセット */}
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

      {/* 結果リスト */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="space-y-4">
          {filteredFacilities.map((facility) => {
            const AvailabilityIcon = getAvailabilityIcon(facility.availability);
            
            return (
              <div key={facility.id} className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden border border-gray-100">
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-800 mb-2">{facility.name}</h3>
                          <div className="flex items-center gap-2 mb-3">
                            <span className="px-2 py-1 bg-gradient-to-r from-indigo-100 to-blue-100 text-indigo-700 rounded-full text-xs font-medium border border-indigo-200">
                              {getServiceTypeLabel(facility.serviceType)}
                            </span>
                            <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold border ${getAvailabilityColor(facility.availability)}`}>
                              <AvailabilityIcon className="w-3 h-3 mr-1" />
                              <span>{facility.availabilityText}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0 ml-4">
                          <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">{facility.matchScore}%</div>
                          <div className="text-xs text-gray-600">マッチ度</div>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-4 leading-relaxed">{facility.description}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {facility.features.slice(0, 4).map((feature, index) => (
                          <span key={index} className="px-2 py-1 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 rounded-full text-xs font-medium border border-blue-200">
                            {feature}
                          </span>
                        ))}
                        {facility.features.length > 4 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs border border-gray-200">
                            +{facility.features.length - 4}個
                          </span>
                        )}
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{facility.capacity}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{facility.openHours}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{facility.address}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Info className="w-4 h-4" />
                          <span>更新: {facility.lastUpdated}</span>
                        </div>
                      </div>

                      {/* 設備アイコン */}
                      <div className="flex items-center space-x-4 mb-4">
                        {facility.hasParking && (
                          <div className="flex items-center space-x-1 text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-200">
                            <Car className="w-4 h-4" />
                            <span className="text-xs font-medium">駐車場</span>
                          </div>
                        )}
                        {facility.hasPickup && (
                          <div className="flex items-center space-x-1 text-blue-600 bg-blue-50 px-2 py-1 rounded-md border border-blue-200">
                            <Truck className="w-4 h-4" />
                            <span className="text-xs font-medium">送迎</span>
                          </div>
                        )}
                        {facility.hasMeals && (
                          <div className="flex items-center space-x-1 text-amber-600 bg-amber-50 px-2 py-1 rounded-md border border-amber-200">
                            <Utensils className="w-4 h-4" />
                            <span className="text-xs font-medium">食事</span>
                          </div>
                        )}
                        {facility.hasWifi && (
                          <div className="flex items-center space-x-1 text-purple-600 bg-purple-50 px-2 py-1 rounded-md border border-purple-200">
                            <Wifi className="w-4 h-4" />
                            <span className="text-xs font-medium">Wi-Fi</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 mt-4">
                    <button
                      onClick={() => {
                        setSelectedFacility(facility);
                        setCurrentView('detail');
                      }}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-sm"
                    >
                      詳細を見る
                      <ChevronRight className="inline ml-2 w-4 h-4" />
                    </button>
                    <button className="sm:w-auto bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-green-300 shadow-sm">
                      <Calendar className="inline mr-2 w-4 h-4" />
                      見学予約
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredFacilities.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">条件に合う施設が見つかりませんでした</h3>
            <p className="text-gray-600 mb-6">フィルター条件を調整してみてください</p>
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
              className="px-6 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-colors focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              フィルターをリセット
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsScreen;