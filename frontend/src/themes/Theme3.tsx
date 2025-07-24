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

const Theme3Container = styled.div`
  font-family: 'Cormorant Garamond', serif;
  color: #2a2a2a;
  line-height: 1.8;
`;

const Header = styled.header<HeaderProps>`
  position: relative;
  height: ${props => props.height || '100vh'};
  background: #1a1a1a;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.3));
    z-index: 1;
  }
`;

const HeaderContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 800px;
`;

const Logo = styled.img`
  max-width: 180px;
  margin-bottom: 2rem;
`;

const MainTitle = styled.h1`
  font-size: 5rem;
  font-weight: 400;
  margin-bottom: 1.5rem;
  letter-spacing: 2px;
`;

const Subheader = styled.p`
  font-size: 1.8rem;
  font-style: italic;
  margin-bottom: 2rem;
  opacity: 0.9;
`;

const Section = styled.section`
  padding: 10rem 0;
  position: relative;
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 3.5rem;
  font-weight: 400;
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
  
  &::after {
    content: '';
    display: block;
    width: 60px;
    height: 2px;
    background: #c4a747;
    margin: 1rem auto;
  }
`;

const AboutSection = styled(Section)`
  background: #f9f7f4;
`;

const AboutContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  font-size: 1.2rem;
  line-height: 2;
`;

const RoomsSection = styled(Section)`
  background: #fff;
`;

const RoomGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 4rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const RoomCard = styled.div`
  position: relative;
  overflow: hidden;
  
  &:hover img {
    transform: scale(1.1);
  }
`;

const RoomImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  transition: transform 0.8s ease;
`;

const RoomOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2rem;
  background: linear-gradient(transparent, rgba(0,0,0,0.8));
  color: white;
  transform: translateY(100%);
  transition: transform 0.3s ease;

  ${RoomCard}:hover & {
    transform: translateY(0);
  }

  h3 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.1rem;
    opacity: 0.9;
  }
`;

const ExploreSection = styled(Section)`
  background: #1a1a1a;
  color: white;
  text-align: center;
`;

const ExploreButton = styled.a`
  display: inline-block;
  padding: 1.2rem 3rem;
  border: 2px solid #c4a747;
  color: #c4a747;
  text-decoration: none;
  font-size: 1.2rem;
  margin-top: 2rem;
  transition: all 0.3s ease;

  &:hover {
    background: #c4a747;
    color: #1a1a1a;
  }
`;

const Footer = styled.footer`
  background: #1a1a1a;
  color: white;
  padding: 6rem 0;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const FooterSection = styled.div`
  h4 {
    font-size: 1.8rem;
    margin-bottom: 2rem;
    color: #c4a747;
  }

  p {
    font-size: 1.1rem;
    margin-bottom: 1rem;
    opacity: 0.8;
  }
`;

const Theme3: React.FC<ThemeProps> = ({ config }) => {
  return (
    <Theme3Container>
      <Header height={config.bannerHeight + 'px'}>
        <HeaderContent>
          {config.logo && <Logo src={URL.createObjectURL(config.logo)} alt={config.siteName} />}
          <MainTitle>{config.siteName}</MainTitle>
          <Subheader>{config.subheader}</Subheader>
        </HeaderContent>
      </Header>

      <AboutSection>
        <Container>
          <SectionTitle>Hakkımızda</SectionTitle>
          <AboutContent>
            <p>{config.aboutUs}</p>
            <p style={{ marginTop: '2rem' }}>
              <strong>Çalışma Saatleri:</strong> {config.workingHours}
            </p>
          </AboutContent>
        </Container>
      </AboutSection>

      <RoomsSection>
        <Container>
          <SectionTitle>Odalarımız</SectionTitle>
          <p style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem' }}>
            {config.roomsDescription}
          </p>
          <RoomGrid>
            <RoomCard>
              <RoomImage src="/assets/room-1.jpg" alt="Standart Oda" />
              <RoomOverlay>
                <h3>Standart Oda</h3>
                <p>Zarif tasarım ve konforun buluştuğu özel odalar</p>
              </RoomOverlay>
            </RoomCard>
            <RoomCard>
              <RoomImage src="/assets/room-2.jpg" alt="Deluxe Oda" />
              <RoomOverlay>
                <h3>Deluxe Oda</h3>
                <p>Lüks ve rahatlığın mükemmel uyumu</p>
              </RoomOverlay>
            </RoomCard>
            <RoomCard>
              <RoomImage src="/assets/room-3.jpg" alt="Suit Oda" />
              <RoomOverlay>
                <h3>Suit Oda</h3>
                <p>Eşsiz manzara ve premium konfor</p>
              </RoomOverlay>
            </RoomCard>
          </RoomGrid>
        </Container>
      </RoomsSection>

      <ExploreSection>
        <Container>
          <SectionTitle style={{ color: 'white' }}>{config.exploreTopText}</SectionTitle>
          <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto' }}>
            {config.exploreText}
          </p>
          <ExploreButton href={config.exploreButtonLink}>
            {config.exploreButtonText}
          </ExploreButton>
        </Container>
      </ExploreSection>

      <Footer>
        <Container>
          <FooterGrid>
            <FooterSection>
              <h4>İletişim</h4>
              <p>{config.phone}</p>
              <p>{config.email}</p>
            </FooterSection>
            <FooterSection>
              <h4>Adres</h4>
              <p>{config.address}</p>
            </FooterSection>
            <FooterSection>
              <h4>Konum</h4>
              <div dangerouslySetInnerHTML={{ __html: config.mapCode }} />
            </FooterSection>
          </FooterGrid>
          <p style={{ 
            textAlign: 'center', 
            marginTop: '4rem', 
            opacity: '0.6',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            paddingTop: '2rem'
          }}>
            {config.footerText}
          </p>
        </Container>
      </Footer>

      {config.snowEffect && (
        <div className="snow-container">
          {/* Snow effect will be implemented with CSS animations */}
        </div>
      )}
    </Theme3Container>
  );
};

export default Theme3; 