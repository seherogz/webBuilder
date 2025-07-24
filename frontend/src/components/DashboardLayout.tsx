import React, { ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Dashboard.css';

interface DashboardLayoutProps {
  children: ReactNode;
}

const menuItems = [
  { id: 'home', icon: '🏠', label: 'Anasayfa', path: '/dashboard' },
  { id: 'hotels', icon: '🏨', label: 'Otellerim', path: '/dashboard?tab=hotels' },
  { id: 'users', icon: '👥', label: 'Kullanıcılar', path: '/users' },
  { id: 'templates', icon: '🎨', label: 'Şablonlar', path: '/dashboard?tab=templates' },
  { id: 'settings', icon: '⚙️', label: 'Genel Ayarlar', path: '/dashboard?tab=settings' },
  { id: 'languages', icon: '🌐', label: 'Dil Seçenekleri', path: '/dashboard?tab=languages' },
  { id: 'chat', icon: '💬', label: 'Chat Ayarları', path: '/dashboard?tab=chat' },
  { id: 'banners', icon: '📱', label: 'Banner Ayarları', path: '/dashboard?tab=banners' },
  { id: 'social', icon: '📱', label: 'Sosyal Medyalar', path: '/dashboard?tab=social' },
  { id: 'gallery', icon: '🖼️', label: 'Galeri Ayarları', path: '/dashboard?tab=gallery' },
  { id: 'opportunities', icon: '🎯', label: 'Fırsat Tanımlamaları', path: '/dashboard?tab=opportunities' },
  { id: 'categories', icon: '📂', label: 'Sayfa Kategorileri', path: '/dashboard?tab=categories' },
  { id: 'pages', icon: '📄', label: 'Sayfa Tanımlamaları', path: '/dashboard?tab=pages' }
];

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5001/api/auth/logout', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login');
    } catch (error) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="dashboard-layout">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-brand">
          <div className="brand-icon">🏨</div>
          <div className="brand-text">
            <h1>WebBuilder</h1>
            <span>DESIGNER</span>
          </div>
        </div>
        <div className="header-actions">
          <div className="language-selector">
            <select>
              <option value="tr">TR</option>
              <option value="en">EN</option>
            </select>
          </div>
          <button 
            className="logout-btn" 
            onClick={handleLogout}
            disabled={isLoading}
          >
            {isLoading ? 'Çıkış...' : 'Çıkış Yap'}
          </button>
        </div>
      </div>
      <div className="dashboard-body">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="sidebar-header">
            <button className="publish-btn">Sitemi Yayınla</button>
            <button className="preview-btn">Önizleme</button>
          </div>
          <div className="sidebar-menu">
            {menuItems.map((item) => (
              <div
                key={item.id}
                className={`menu-item${window.location.pathname === item.path ? ' active' : ''}`}
                onClick={() => navigate(item.path)}
              >
                <span className="menu-icon">{item.icon}</span>
                <span className="menu-label">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Main Content */}
        <div className="main-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout; 