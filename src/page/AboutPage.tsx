import React, { useEffect } from 'react';
import About from '../feature/components/About';

const AboutPage = () => {
  useEffect(() => {
    document.title = 'About Us - Yumbinder';
  });
  return <About />;
};

export default AboutPage;
