import React from 'react';
import { Link } from 'react-router-dom';
const Logo = () => {
  return (
    <Link to={'/'} className="flex items-center gap-2">
      <img
        src="\image\logo 1.png"
        alt="logo"
        className="w-[35px] h-[35px] object-cover"
      />
      <h1 className="text-[20px] font-bold logo   text-[#f8982d]">Yumbinder</h1>
    </Link>
  );
};
export default Logo;
