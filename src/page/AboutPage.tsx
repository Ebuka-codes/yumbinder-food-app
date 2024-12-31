import React, { useEffect } from 'react';
import About from '../feature/components/About';

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
    document.title = 'About Us - Spicydish';
  });
  return <About />;
};

export default AboutPage;
