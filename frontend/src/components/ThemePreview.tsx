import React from 'react';
import Theme1 from '../themes/Theme1';
import Theme2 from '../themes/Theme2';
import Theme3 from '../themes/Theme3';

interface ThemePreviewProps {
  theme: string;
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

const ThemePreview: React.FC<ThemePreviewProps> = ({ theme, config }) => {
  switch (theme) {
    case 'theme1':
      return <Theme1 config={config} />;
    case 'theme2':
      return <Theme2 config={config} />;
    case 'theme3':
      return <Theme3 config={config} />;
    default:
      return <div>Lütfen bir tema seçin</div>;
  }
};

export default ThemePreview; 