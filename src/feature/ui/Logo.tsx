import React from 'react';
import { Link } from 'react-router-dom';
const Logo = () => {
  return (
    <Link to={'/'} className="flex items-center gap-2">
      <img
        src="\image\logo 1.png"
        alt="logo"
        className="w-[30px] h-[30px] object-cover"
      />
      <h1 className="text-[24px] font-semibold logo text-[#fa9b42]">
        Yumbinder
      </h1>
    </Link>
  );
};
export default Logo;