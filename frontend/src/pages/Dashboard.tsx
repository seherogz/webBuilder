import React, { useEffect, useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
  }, []);

  // Only render the main dashboard content (not sidebar/header)
  return (
    <DashboardLayout>
      <div className="main-content-section">
        <h2>Kurulum ve Tasarım Süreci</h2>
        <div className="setup-steps">
          <div className="step-card">
            <h3>1 - Web Sitesi Tasarımı</h3>
            <p>
              Panelin sol kısmında yer alan pencereler, web sitesi tasarımı için uygun sırada konumlanmıştır. 
              Bu sıranın doğru şekilde izlenmesiyle, genel ayarlardan başlayarak kullanıcılar sekmesine kadar 
              dokümanda anlatıldığı üzere ilerenir. Kullanıcı, panelin sol kısmında yer alan "Önizleme" 
              butonu ile web sitesi yayınlanmadan, yapılan bütün değişiklikler önizlenebilir.
            </p>
          </div>
          <div className="step-card">
            <h3>2 - Yönlendirme İşlemleri</h3>
            <p>
              Kullanıcı, var olan veya satın alınacak olan domain adresini hazırlar. İkinci adımda ise 
              satın alınan domain firmasının web sitesine gidilir. Web sitesinde DNS ayarları paneli 
              bulunur ve "209.250.230.184" adresine A kaydı domain yönlendirilmesi sağlanır.
            </p>
          </div>
          <div className="step-card">
            <h3>3 - Canlıya Alma İşlemi</h3>
            <p>
              Canlıya alma işlemleri için web sitesi hosting ayarlamaları Elektraweb ekibi tarafından yapılır. 
              Canlıya alma işlemi "Sitemi Yayınla" butonu ile tamamlanır.
            </p>
          </div>
          <div className="step-card">
            <h3>Güncelleme İşlemleri</h3>
            <p>
              Web sitenizde yapacağınız tüm değişiklikler anında yansıyacaktır. Güncelleme işlemleri 
              için herhangi bir ek adım gerekmemektedir.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard; 