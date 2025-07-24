import React from 'react';
import styled from 'styled-components';

interface ThemeProps {
  config: {
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
  };
}

interface HeaderProps {
  height?: string;
}

const Theme1Container = styled.div`
  font-family: 'Playfair Display', serif;
  color: #2c3e50;
`;

const Header = styled.header<HeaderProps>`
  background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/assets/luxury-hotel-1.jpg');
  background-size: cover;
  background-position: center;
  height: ${props => props.height || '600px'};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
`;

const Logo = styled.img`
  max-width: 200px;
  margin-bottom: 2rem;
`;

const MainTitle = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
`;

const Subheader = styled.p`
  font-size: 1.5rem;
  max-width: 600px;
  margin: 0 auto;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
`;

const Section = styled.section`
  padding: 5rem 0;
  background: white;
`;

const AboutSection = styled(Section)`
  background: #f8f9fa;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
  color: #2c3e50;
  &:after {
    content: '';
    display: block;
    width: 100px;
    height: 3px;
    background: #e67e22;
    margin: 1rem auto;
  }
`;

const RoomGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const RoomCard = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const RoomImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const RoomInfo = styled.div`
  padding: 1.5rem;
`;

const Footer = styled.footer`
  background: #2c3e50;
  color: white;
  padding: 4rem 0;
`;

const ContactInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const Theme1: React.FC<ThemeProps> = ({ config }) => {
  return (
    <Theme1Container>
      <Header height={config.bannerHeight + 'px'}>
        {config.logo && <Logo src={URL.createObjectURL(config.logo)} alt={config.siteName} />}
        <MainTitle>{config.siteName}</MainTitle>
        <Subheader>{config.subheader}</Subheader>
      </Header>

      <AboutSection>
        <Container>
          <SectionTitle>Hakkımızda</SectionTitle>
          <p>{config.aboutUs}</p>
          <p><strong>Çalışma Saatleri:</strong> {config.workingHours}</p>
        </Container>
      </AboutSection>

      <Section>
        <Container>
          <SectionTitle>Odalarımız</SectionTitle>
          <p>{config.roomsDescription}</p>
          <RoomGrid>
            <RoomCard>
              <RoomImage src="/assets/room-1.jpg" alt="Standart Oda" />
              <RoomInfo>
                <h3>Standart Oda</h3>
                <p>Konforlu ve şık tasarımlı odalarımız</p>
              </RoomInfo>
            </RoomCard>
            <RoomCard>
              <RoomImage src="/assets/room-2.jpg" alt="Deluxe Oda" />
              <RoomInfo>
                <h3>Deluxe Oda</h3>
                <p>Lüks ve ferah odalarımız</p>
              </RoomInfo>
            </RoomCard>
            <RoomCard>
              <RoomImage src="/assets/room-3.jpg" alt="Suit Oda" />
              <RoomInfo>
                <h3>Suit Oda</h3>
                <p>En üst düzey konfor ve lüks</p>
              </RoomInfo>
            </RoomCard>
          </RoomGrid>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionTitle>Keşfedin</SectionTitle>
          <h3>{config.exploreTopText}</h3>
          <p>{config.exploreText}</p>
          <a href={config.exploreButtonLink}>{config.exploreButtonText}</a>
        </Container>
      </Section>

      <Footer>
        <Container>
          <SectionTitle style={{ color: 'white' }}>İletişim</SectionTitle>
          <ContactInfo>
            <div>
              <h4>Adres</h4>
              <p>{config.address}</p>
            </div>
            <div>
              <h4>İletişim</h4>
              <p>Tel: {config.phone}</p>
              <p>Email: {config.email}</p>
            </div>
            <div>
              <h4>Harita</h4>
              <div dangerouslySetInnerHTML={{ __html: config.mapCode }} />
            </div>
          </ContactInfo>
          <p style={{ textAlign: 'center', marginTop: '3rem' }}>{config.footerText}</p>
        </Container>
      </Footer>

      {config.snowEffect && (
        <div className="snow-container">
          {/* Snow effect will be implemented with CSS animations */}
        </div>
      )}
    </Theme1Container>
  );
};

export default Theme1; 