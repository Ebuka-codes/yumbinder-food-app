import React, { useEffect } from 'react';
import Topics from '../feature/components/Topics';
import { useParams } from 'react-router-dom';

const TopicsPage = () => {
  const { name } = useParams();
  useEffect(() => {
    window.scrollTo({ top: 0 });
    document.title = `${name} recipes -  Spicydish`;
  });
  return <Topics />;
};

export default TopicsPage;
