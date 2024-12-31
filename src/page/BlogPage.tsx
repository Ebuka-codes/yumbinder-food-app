import React, { useEffect } from 'react';
import Blog from '../feature/components/Blog';

const BlogPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
    document.title = 'Blog - Spicydish';
  });
  return <Blog />;
};

export default BlogPage;
