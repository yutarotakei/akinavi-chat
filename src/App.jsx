// src/App.jsx
import './index.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ChatBot from './ChatBot';
import ResultsScreen from './pages/ResultsScreen';
import MapScreen from './pages/MapScreen';

function App() {
  return (
    <BrowserRouter>
      {/* 確認用の簡易ナビ（必要なければ削除OK） */}
      <nav className="p-3 text-sm bg-gray-50 border-b border-gray-200">
        <div className="max-w-5xl mx-auto flex gap-4">
          <Link className="text-blue-600 hover:underline" to="/">チャット</Link>
          <Link className="text-blue-600 hover:underline" to="/results">結果一覧</Link>
          <Link className="text-blue-600 hover:underline" to="/map">マップ</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<ChatBot />} />
        <Route path="/results" element={<ResultsScreen />} />
        <Route path="/map" element={<MapScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
