import React, { useEffect } from 'react';
import Contact from '../feature/components/Contact';

const ContactPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
    document.title = 'Contact Us - Yumbinder';
  });
  return <Contact />;
};

export default ContactPage;
