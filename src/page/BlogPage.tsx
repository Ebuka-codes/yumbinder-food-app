import React, { useEffect } from 'react';
import Blog from '../feature/components/Blog';

const BlogPage = () => {
  useEffect(() => {
    document.title = 'Blog - Yumbinder';
  });
  return <Blog />;
};

export default BlogPage;
