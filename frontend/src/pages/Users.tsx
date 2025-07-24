import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DashboardLayout from '../components/DashboardLayout';
import '../styles/Dashboard.css';
import { Modal, Button, Form } from 'react-bootstrap';

interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}

const Users: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editLoading, setEditLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5001/api/users', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsers(response.data);
      } catch (err) {
        setError('Kullanıcılar alınamadı.');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm('Bu kullanıcıyı silmek istediğinize emin misiniz?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5001/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(users.filter(u => u.id !== id));
    } catch (err) {
      alert('Kullanıcı silinemedi!');
    }
  };

  const openEditModal = (user: User) => {
    setEditUser(user);
    setEditName(user.name);
    setEditEmail(user.email);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditUser(null);
    setEditName('');
    setEditEmail('');
    setEditLoading(false);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editUser) return;
    setEditLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`http://localhost:5001/api/users/${editUser.id}`, {
        name: editName,
        email: editEmail
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(users.map(u => u.id === editUser.id ? { ...u, name: editName, email: editEmail } : u));
      closeEditModal();
    } catch (err) {
      alert('Kullanıcı güncellenemedi!');
      setEditLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="main-content-section">
        <h2>Kullanıcılar</h2>
        <div className="users-header" style={{ justifyContent: 'flex-start' }}>
          <button 
            className="vintage-btn primary add-user-btn"
            onClick={async () => {
              try {
                await axios.post('http://localhost:5001/api/auth/track/register-page-visit', {
                  source: 'users'
                });
              } catch (e) {}
              navigate('/register');
            }}
          >
            + Yeni Kullanıcı Ekle
          </button>
        </div>
        <div className="users-table">
          <div className="table-header">
            <div className="table-cell">ID</div>
            <div className="table-cell">Ad</div>
            <div className="table-cell">Email</div>
            <div className="table-cell">Kayıt Tarihi</div>
            <div className="table-cell">İşlemler</div>
          </div>
          {loading ? (
            <div className="table-row"><div className="table-cell">Yükleniyor...</div></div>
          ) : error ? (
            <div className="table-row"><div className="table-cell">{error}</div></div>
          ) : users.length === 0 ? (
            <div className="table-row"><div className="table-cell">Kullanıcı yok</div></div>
          ) : (
            users.map(user => (
              <div className="table-row" key={user.id}>
                <div className="table-cell">{user.id}</div>
                <div className="table-cell">{user.name}</div>
                <div className="table-cell">{user.email}</div>
                <div className="table-cell">{new Date(user.createdAt).toLocaleDateString('tr-TR')}</div>
                <div className="table-cell">
                  <button className="edit-btn" onClick={() => openEditModal(user)}>✏️</button>
                  <button className="delete-btn" onClick={() => handleDelete(user.id)}>🗑️</button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Edit Modal */}
        <Modal show={showEditModal} onHide={closeEditModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Kullanıcıyı Düzenle</Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleEditSubmit}>
            <Modal.Body>
              <Form.Group className="mb-3">
                <Form.Label>Ad</Form.Label>
                <Form.Control
                  type="text"
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={editEmail}
                  onChange={e => setEditEmail(e.target.value)}
                  required
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={closeEditModal} disabled={editLoading}>
                Vazgeç
              </Button>
              <Button variant="primary" type="submit" disabled={editLoading}>
                {editLoading ? 'Kaydediliyor...' : 'Kaydet'}
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Users; 