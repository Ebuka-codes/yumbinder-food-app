import React, { useEffect } from 'react';

type OverlayType = {
  children: React.ReactNode;
};

const SideBarOverlay = ({ children }: OverlayType) => {
  useEffect(() => {
    document.documentElement.style.overflowY = 'hidden';
    return () => {
      document.documentElement.style.overflowY = 'visible';
    };
  });
  return (
    <div className="fixed top-0 mt-12 left-0 w-full h-screen bg-[rgba(0,0,0,0.7)] z-[9999]">
      {children}
    </div>
  );
};

export default SideBarOverlay;
