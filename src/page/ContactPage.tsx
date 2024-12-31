import React, { useEffect } from 'react';
import Contact from '../feature/components/Contact';

const ContactPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
    document.title = 'Contact Us - Foodies';
  });
  return <Contact />;
};

export default ContactPage;
