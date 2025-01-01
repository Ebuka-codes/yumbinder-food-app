import React, { useEffect } from 'react';
import Contact from '../feature/components/Contact';

const ContactPage = () => {
  useEffect(() => {
    document.title = 'Contact Us - Yumbinder';
  });
  return <Contact />;
};

export default ContactPage;
