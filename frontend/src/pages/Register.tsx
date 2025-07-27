import React, { useState, useEffect } from 'react';
import { Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Auth.css';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Şifreler eşleşmiyor');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5001/api/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      // Kayıt başarılı, login sayfasına yönlendir
      alert('Kayıt işlemi başarıyla tamamlandı! Giriş yapabilirsiniz.');
      navigate('/login');
    } catch (err: any) {
      setError(
        err.response?.data || 
        'Kayıt sırasında bir hata oluştu. Lütfen bilgilerinizi kontrol edin.'
      );
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Kayıt Ol</h1>
        <h2 className="auth-subtitle">Yeni hesap oluştur</h2>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-4">
            <Form.Label>Ad Soyad</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ad Soyad"
              required
              className="vintage-input"
              disabled={isLoading}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>E-posta Adresi</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="ornek@email.com"
              required
              className="vintage-input"
              disabled={isLoading}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Şifre</Form.Label>
            <div className="password-input-container">
              <Form.Control
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="En az 8 karakter"
                required
                className="vintage-input"
                disabled={isLoading}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Şifre Tekrar</Form.Label>
            <div className="password-input-container">
              <Form.Control
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Şifrenizi tekrar girin"
                required
                className="vintage-input"
                disabled={isLoading}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={isLoading}
              >
                {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </Form.Group>

          <button 
            type="submit" 
            className="vintage-button w-100"
            disabled={isLoading}
          >
            {isLoading ? 'KAYIT YAPILIYOR...' : 'KAYIT OL'}
          </button>


        </Form>

        <div className="auth-footer">
          © 2025
        </div>
      </div>
    </div>
  );
};

export default Register; 