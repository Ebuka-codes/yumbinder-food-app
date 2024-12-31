import React, { SetStateAction, useEffect } from 'react';
import { Link } from 'react-router-dom';
type NotificationType = {
  setNotificationOpen: React.Dispatch<SetStateAction<boolean>>;
};
const Notification = ({ setNotificationOpen }: NotificationType) => {
  useEffect(() => {
    document.documentElement.style.overflowY = 'hidden';
    return () => {
      document.documentElement.style.overflowY = 'visible';
    };
  });
  return (
    <div className="bg-white xl:w-[35%] lg:w-[50%] sm:w-[70%] md:w-[60%] w-full rounded-sm  p-5 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-center">
      <h1>Welcome to</h1>
      <span className="flex items-center gap-2 justify-center mb-3">
        <img
          src="\image\logo 1.png"
          alt="logo"
          className="w-[30px] h-[30px] object-cover"
        />
        <h1 className="text-[24px] font-semibold logo text-[#fa9b42]">
          Yumbinder
        </h1>
      </span>
      <p className="text-[12px] mt-2  text-center">
        Unlock Yumbinder recipes and your
        <br /> personal recipe box with free account
      </p>
      <span className="space-y-3 flex flex-col my-5">
        <Link
          to={'/auth/signUp'}
          className="bg-stone-900 text-white font-medium rounded-md p-2 outline-none"
        >
          Create Account
        </Link>
        <Link
          to={'/auth/login'}
          className="border border-stone-600 text-stone-900 font-medium rounded-md p-2 outline-none"
        >
          Log In
        </Link>
      </span>
      <Link
        to={''}
        className="text-[12px] text-[#fa9b42] my-3"
        onClick={() => setNotificationOpen(false)}
      >
        No thanks, take me home
      </Link>
    </div>
  );
};

export default Notification;
