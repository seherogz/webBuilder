import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import '../styles/Home.css';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginNavigation = async () => {
    try {
      setIsLoading(true);

      // Backend'e sayfa ziyareti bilgisini gönder
      await axios.post('http://localhost:5001/api/auth/track/login-page-visit', {
        source: 'home'
      });

      // Login sayfasına yönlendir
      navigate('/login');
    } catch (error) {
      console.error('Error tracking login page visit:', error);
      // Hata olsa bile yönlendirmeyi yap
      navigate('/login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="home-container">
      <Container>
        <div className="welcome-section">
          <h1 className="main-title">Web Builder</h1>
          <p className="subtitle">Otel Web Sitesi Oluşturucu</p>
        </div>

        <Row className="justify-content-center">
          <Col md={6}>
            <Card 
              className="auth-option-card" 
              onClick={handleLoginNavigation}
            >
              <Card.Body>
                <div className="card-icon">🔑</div>
                <Card.Title>
                  {isLoading ? 'Yönlendiriliyor...' : 'Giriş Yap'}
                </Card.Title>
                <Card.Text>
                  Hesabınız varsa giriş yaparak devam edin
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <div className="features-section">
          <h2>Özellikler</h2>
          <Row className="mt-4">
            <Col md={4}>
              <div className="feature-item">
                <div className="feature-icon">🎨</div>
                <h3>Kolay Tasarım</h3>
                <p>Sürükle-bırak ile kolayca tasarlayın</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="feature-item">
                <div className="feature-icon">🚀</div>
                <h3>Hızlı Yayın</h3>
                <p>Dakikalar içinde sitenizi yayınlayın</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="feature-item">
                <div className="feature-icon">📱</div>
                <h3>Mobil Uyumlu</h3>
                <p>Tüm cihazlarda mükemmel görünüm</p>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default Home; 