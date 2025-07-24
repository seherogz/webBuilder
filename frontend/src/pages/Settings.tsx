import React, { useState } from 'react';
import { Form, Alert, Modal, Button } from 'react-bootstrap';
import DashboardLayout from '../components/DashboardLayout';
import ThemePreview from '../components/ThemePreview';
import '../styles/Dashboard.css';

interface FormData {
  theme: string;
  siteName: string;
  subheader: string;
  logo?: File;
  bannerHeight: string;
  snowEffect: boolean;
  aboutUs: string;
  workingHours: string;
  exploreTopText: string;
  exploreText: string;
  exploreButtonText: string;
  exploreButtonLink: string;
  campaignsDescription: string;
  roomsDescription: string;
  footerText: string;
  phone: string;
  email: string;
  address: string;
  mapCode: string;
  // Additional fields not used in preview
  siteUrl: string;
  defaultLanguage: string;
  font: string;
  themeColor: string;
  headerColor: string;
  headerFooterTextColor: string;
  hotelId: string;
  gtmCode: string;
  favicon: File | null;
  reservationMode: string;
  reservationUrl: string;
  phone2: string;
  whatsapp: string;
  homeScreenTitle: string;
  homeScreenDescription: string;
  additionalInfo: string;
}

const Settings: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    theme: '',
    siteName: '',
    siteUrl: '',
    subheader: '',
    snowEffect: false,
    defaultLanguage: 'tr',
    font: '',
    themeColor: '',
    headerColor: '',
    headerFooterTextColor: '',
    hotelId: '',
    bannerHeight: '300',
    gtmCode: '',
    favicon: null,
    reservationMode: 'widget',
    reservationUrl: '',
    phone: '',
    phone2: '',
    whatsapp: '',
    email: '',
    address: '',
    mapCode: '',
    homeScreenTitle: '',
    homeScreenDescription: '',
    aboutUs: '',
    workingHours: '',
    exploreTopText: '',
    exploreText: '',
    exploreButtonText: '',
    exploreButtonLink: '',
    campaignsDescription: '',
    roomsDescription: '',
    footerText: '',
    additionalInfo: ''
  });

  const [showPreview, setShowPreview] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'file') {
      const fileInput = e.target as HTMLInputElement;
      const file = fileInput.files?.[0] || null;
      setFormData(prev => ({
        ...prev,
        [name]: file
      }));
    } else if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      // TODO: API entegrasyonu yapılacak
      console.log('Form data:', formData);
      setSuccess('Ayarlar başarıyla kaydedildi!');
    } catch (err: any) {
      setError('Ayarlar kaydedilirken bir hata oluştu.');
    } finally {
      setIsLoading(false);
    }
  };

  // Create a config object for theme preview that only includes required fields
  const themeConfig = {
    siteName: formData.siteName,
    subheader: formData.subheader,
    logo: formData.logo,
    bannerHeight: formData.bannerHeight,
    snowEffect: formData.snowEffect,
    aboutUs: formData.aboutUs,
    workingHours: formData.workingHours,
    exploreTopText: formData.exploreTopText,
    exploreText: formData.exploreText,
    exploreButtonText: formData.exploreButtonText,
    exploreButtonLink: formData.exploreButtonLink,
    campaignsDescription: formData.campaignsDescription,
    roomsDescription: formData.roomsDescription,
    footerText: formData.footerText,
    phone: formData.phone,
    email: formData.email,
    address: formData.address,
    mapCode: formData.mapCode
  };

  return (
    <DashboardLayout>
      <div className="main-content-section">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Genel Ayarlar</h2>
          <Button 
            variant="primary" 
            onClick={handlePreview}
            disabled={!formData.theme}
            className="preview-button"
            style={{
              background: '#662a42',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '4px',
              fontWeight: '600',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = '#883a4e'}
            onMouseOut={(e) => e.currentTarget.style.background = '#662a42'}
          >
            🔍 Temayı Önizle
          </Button>
        </div>
        
        {error && <Alert variant="danger" className="mb-4">{error}</Alert>}
        {success && <Alert variant="success" className="mb-4">{success}</Alert>}

        <Form onSubmit={handleSubmit}>
          {/* Tema Seçimi */}
          <Form.Group className="mb-4">
            <Form.Label>Tema Seçimi</Form.Label>
            <Form.Select
              name="theme"
              value={formData.theme}
              onChange={handleInputChange}
              required
            >
              <option value="">Tema seçiniz</option>
              <option value="theme1">Tema 1</option>
              <option value="theme2">Tema 2</option>
              <option value="theme3">Tema 3</option>
            </Form.Select>
          </Form.Group>

          {/* Site URL */}
          <Form.Group className="mb-4">
            <Form.Label>Site URL'si</Form.Label>
            <Form.Control
              type="text"
              name="siteUrl"
              value={formData.siteUrl}
              onChange={handleInputChange}
              placeholder="www.oteladi.com"
            />
          </Form.Group>

          {/* Subheader */}
          <Form.Group className="mb-4">
            <Form.Label>Subheader (Kısa tanıtım başlığı)</Form.Label>
            <Form.Control
              type="text"
              name="subheader"
              value={formData.subheader}
              onChange={handleInputChange}
              placeholder="Ege'nin huzur veren kıyısında lüks bir kaçamak"
            />
          </Form.Group>

          {/* Kar Efekti */}
          <Form.Group className="mb-4">
            <Form.Check
              type="checkbox"
              name="snowEffect"
              checked={formData.snowEffect}
              onChange={handleInputChange}
              label="Kar Efekti"
            />
          </Form.Group>

          {/* Varsayılan Dil */}
          <Form.Group className="mb-4">
            <Form.Label>Varsayılan Dil</Form.Label>
            <Form.Select
              name="defaultLanguage"
              value={formData.defaultLanguage}
              onChange={handleInputChange}
            >
              <option value="tr">Türkçe</option>
              <option value="en">İngilizce</option>
              <option value="other">Diğer</option>
            </Form.Select>
          </Form.Group>

          {/* Yazı Fontu */}
          <Form.Group className="mb-4">
            <Form.Label>Yazı Fontu</Form.Label>
            <Form.Select
              name="font"
              value={formData.font}
              onChange={handleInputChange}
            >
              <option value="">Font seçiniz</option>
              <option value="ABeeZee">ABeeZee</option>
              <option value="Roboto">Roboto</option>
              <option value="Lato">Lato</option>
            </Form.Select>
          </Form.Group>

          {/* Tema Renk Ayarları */}
          <h3 className="settings-section-title">Tema Renk Ayarları</h3>
          
          <Form.Group className="mb-4">
            <Form.Label>Tema Rengi</Form.Label>
            <Form.Control
              type="color"
              name="themeColor"
              value={formData.themeColor}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Header Rengi</Form.Label>
            <Form.Control
              type="color"
              name="headerColor"
              value={formData.headerColor}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Header/Footer Yazı Rengi</Form.Label>
            <Form.Control
              type="color"
              name="headerFooterTextColor"
              value={formData.headerFooterTextColor}
              onChange={handleInputChange}
            />
          </Form.Group>

          {/* Otel Bilgileri */}
          <h3 className="settings-section-title">Otel Bilgileri</h3>

          <Form.Group className="mb-4">
            <Form.Label>Otel ID (Opsiyonel)</Form.Label>
            <Form.Control
              type="text"
              name="hotelId"
              value={formData.hotelId}
              onChange={handleInputChange}
              placeholder="Teknik destek amaçlı"
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Site Adı</Form.Label>
            <Form.Control
              type="text"
              name="siteName"
              value={formData.siteName}
              onChange={handleInputChange}
              placeholder="Albatros Hotel Bodrum"
              required
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Site Logosu (200px x 100px)</Form.Label>
            <Form.Control
              type="file"
              name="logo"
              onChange={handleInputChange}
              accept="image/*"
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Banner Yüksekliği (px)</Form.Label>
            <Form.Control
              type="number"
              name="bannerHeight"
              value={formData.bannerHeight}
              onChange={handleInputChange}
              placeholder="300"
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>GTM (Google Tag Manager) Kodu</Form.Label>
            <Form.Control
              type="text"
              name="gtmCode"
              value={formData.gtmCode}
              onChange={handleInputChange}
              placeholder="GTM-XXXXXX"
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Favicon</Form.Label>
            <Form.Control
              type="file"
              name="favicon"
              onChange={handleInputChange}
              accept="image/x-icon,image/png"
            />
          </Form.Group>

          {/* Rezervasyon Ayarları */}
          <h3 className="settings-section-title">Rezervasyon Ayarları</h3>

          <Form.Group className="mb-4">
            <Form.Label>Rezervasyon Modu</Form.Label>
            <Form.Select
              name="reservationMode"
              value={formData.reservationMode}
              onChange={handleInputChange}
            >
              <option value="widget">Widget</option>
              <option value="link">Link</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Rezervasyon URL</Form.Label>
            <Form.Control
              type="text"
              name="reservationUrl"
              value={formData.reservationUrl}
              onChange={handleInputChange}
              placeholder="https://rezervasyon.oteladi.com"
            />
          </Form.Group>

          {/* İletişim Bilgileri */}
          <h3 className="settings-section-title">İletişim Bilgileri</h3>

          <Form.Group className="mb-4">
            <Form.Label>Telefon</Form.Label>
            <Form.Control
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="+90 XXX XXX XX XX"
              required
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>2. Telefon (opsiyonel)</Form.Label>
            <Form.Control
              type="tel"
              name="phone2"
              value={formData.phone2}
              onChange={handleInputChange}
              placeholder="+90 XXX XXX XX XX"
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>WhatsApp</Form.Label>
            <Form.Control
              type="tel"
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleInputChange}
              placeholder="+90 XXX XXX XX XX"
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>E-posta</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="info@oteladi.com"
              required
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Açık Adres</Form.Label>
            <Form.Control
              as="textarea"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              rows={3}
              required
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Harita Kodu (MAP Embed Code)</Form.Label>
            <Form.Control
              as="textarea"
              name="mapCode"
              value={formData.mapCode}
              onChange={handleInputChange}
              rows={3}
              placeholder="<iframe>...</iframe>"
            />
          </Form.Group>

          {/* Metin Alanları */}
          <h3 className="settings-section-title">Metin Alanları</h3>

          <Form.Group className="mb-4">
            <Form.Label>Giriş Ekranı Başlığı</Form.Label>
            <Form.Control
              type="text"
              name="homeScreenTitle"
              value={formData.homeScreenTitle}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Giriş Başlık Açıklaması</Form.Label>
            <Form.Control
              as="textarea"
              name="homeScreenDescription"
              value={formData.homeScreenDescription}
              onChange={handleInputChange}
              rows={3}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Hakkımızda Yazısı</Form.Label>
            <Form.Control
              as="textarea"
              name="aboutUs"
              value={formData.aboutUs}
              onChange={handleInputChange}
              rows={5}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Çalışma Saatleri</Form.Label>
            <Form.Control
              type="text"
              name="workingHours"
              value={formData.workingHours}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Keşfet Üst Yazısı</Form.Label>
            <Form.Control
              type="text"
              name="exploreTopText"
              value={formData.exploreTopText}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Keşfet Yazısı</Form.Label>
            <Form.Control
              as="textarea"
              name="exploreText"
              value={formData.exploreText}
              onChange={handleInputChange}
              rows={3}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Keşfet Buton Yazısı</Form.Label>
            <Form.Control
              type="text"
              name="exploreButtonText"
              value={formData.exploreButtonText}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Keşfet Buton Link</Form.Label>
            <Form.Control
              type="text"
              name="exploreButtonLink"
              value={formData.exploreButtonLink}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Kampanyalar Açıklaması</Form.Label>
            <Form.Control
              as="textarea"
              name="campaignsDescription"
              value={formData.campaignsDescription}
              onChange={handleInputChange}
              rows={3}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Odalar Açıklaması</Form.Label>
            <Form.Control
              as="textarea"
              name="roomsDescription"
              value={formData.roomsDescription}
              onChange={handleInputChange}
              rows={3}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Footer Yazısı</Form.Label>
            <Form.Control
              as="textarea"
              name="footerText"
              value={formData.footerText}
              onChange={handleInputChange}
              rows={3}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Ek Bilgilendirme</Form.Label>
            <Form.Control
              as="textarea"
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleInputChange}
              rows={3}
              placeholder="Örn: COVID duyurusu"
            />
          </Form.Group>

          <button
            type="submit"
            className="vintage-button w-100"
            disabled={isLoading}
          >
            {isLoading ? 'KAYDEDİLİYOR...' : 'KAYDET'}
          </button>
        </Form>

        {/* Theme Preview Modal */}
        <Modal 
          show={showPreview} 
          onHide={() => setShowPreview(false)}
          size="xl"
          fullscreen
        >
          <Modal.Header closeButton>
            <Modal.Title>Tema Önizleme</Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-0">
            <ThemePreview theme={formData.theme} config={themeConfig} />
          </Modal.Body>
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Settings; 