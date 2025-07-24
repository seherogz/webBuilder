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

const Theme2Container = styled.div`
  font-family: 'Roboto', sans-serif;
  color: #333;
  line-height: 1.6;
`;

const Header = styled.header<HeaderProps>`
  position: relative;
  height: ${props => props.height || '100vh'};
  background: #f5f5f5;
  display: flex;
  align-items: center;
  overflow: hidden;
`;

const HeaderContent = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
`;

const HeaderText = styled.div`
  h1 {
    font-size: 4rem;
    font-weight: 300;
    margin-bottom: 1rem;
    line-height: 1.2;
  }

  p {
    font-size: 1.5rem;
    color: #666;
    margin-bottom: 2rem;
  }
`;

const HeaderImage = styled.div`
  position: relative;
  height: 100%;
  
  img {
    width: 100%;
    height: auto;
    border-radius: 10px;
    box-shadow: 20px 20px 60px rgba(0,0,0,0.1);
  }
`;

const Section = styled.section`
  padding: 8rem 0;
  background: white;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 3rem;
  font-weight: 300;
  margin-bottom: 4rem;
  text-align: center;
  color: #333;
`;

const AboutGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 4rem;
  align-items: center;
`;

const AboutImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
`;

const RoomsSection = styled(Section)`
  background: #f9f9f9;
`;

const RoomGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 3rem;
`;

const RoomCard = styled.div`
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-10px);
  }
`;

const RoomImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
`;

const RoomInfo = styled.div`
  padding: 2rem;

  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  p {
    color: #666;
  }
`;

const ExploreSection = styled(Section)`
  text-align: center;
  background: linear-gradient(45deg, #f3f3f3 0%, #ffffff 100%);
`;

const ExploreButton = styled.a`
  display: inline-block;
  padding: 1rem 3rem;
  background: #333;
  color: white;
  text-decoration: none;
  border-radius: 50px;
  margin-top: 2rem;
  transition: all 0.3s ease;

  &:hover {
    background: #000;
    transform: translateY(-2px);
  }
`;

const Footer = styled.footer`
  background: #333;
  color: white;
  padding: 6rem 0;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 4rem;
`;

const FooterSection = styled.div`
  h4 {
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
  }

  p {
    color: #ccc;
    margin-bottom: 0.5rem;
  }
`;

const Theme2: React.FC<ThemeProps> = ({ config }) => {
  return (
    <Theme2Container>
      <Header height={config.bannerHeight + 'px'}>
        <HeaderContent>
          <HeaderText>
            <h1>{config.siteName}</h1>
            <p>{config.subheader}</p>
          </HeaderText>
          <HeaderImage>
            {config.logo && <img src={URL.createObjectURL(config.logo)} alt={config.siteName} />}
          </HeaderImage>
        </HeaderContent>
      </Header>

      <Section>
        <Container>
          <SectionTitle>Hakkımızda</SectionTitle>
          <AboutGrid>
            <div>
              <p>{config.aboutUs}</p>
              <p><strong>Çalışma Saatleri:</strong> {config.workingHours}</p>
            </div>
            <AboutImage src="/assets/about-hotel.jpg" alt="Otel Hakkında" />
          </AboutGrid>
        </Container>
      </Section>

      <RoomsSection>
        <Container>
          <SectionTitle>Odalarımız</SectionTitle>
          <p style={{ textAlign: 'center', marginBottom: '3rem' }}>{config.roomsDescription}</p>
          <RoomGrid>
            <RoomCard>
              <RoomImage src="/assets/room-1.jpg" alt="Standart Oda" />
              <RoomInfo>
                <h3>Standart Oda</h3>
                <p>Modern konfor ve şıklık bir arada</p>
              </RoomInfo>
            </RoomCard>
            <RoomCard>
              <RoomImage src="/assets/room-2.jpg" alt="Deluxe Oda" />
              <RoomInfo>
                <h3>Deluxe Oda</h3>
                <p>Geniş ve konforlu yaşam alanı</p>
              </RoomInfo>
            </RoomCard>
            <RoomCard>
              <RoomImage src="/assets/room-3.jpg" alt="Suit Oda" />
              <RoomInfo>
                <h3>Suit Oda</h3>
                <p>Lüks ve konforu bir arada yaşayın</p>
              </RoomInfo>
            </RoomCard>
          </RoomGrid>
        </Container>
      </RoomsSection>

      <ExploreSection>
        <Container>
          <SectionTitle>{config.exploreTopText}</SectionTitle>
          <p>{config.exploreText}</p>
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
          <p style={{ textAlign: 'center', marginTop: '4rem', color: '#999' }}>
            {config.footerText}
          </p>
        </Container>
      </Footer>

      {config.snowEffect && (
        <div className="snow-container">
          {/* Snow effect will be implemented with CSS animations */}
        </div>
      )}
    </Theme2Container>
  );
};

export default Theme2; 