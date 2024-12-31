import React, { useEffect } from 'react';
type NotificationOverlayType = {
  children: React.ReactNode;
};
const NotificationOverlay = ({ children }: NotificationOverlayType) => {
  useEffect(() => {
    document.documentElement.style.overflowY = 'hidden';
    return () => {
      document.documentElement.style.overflowY = 'visible';
    };
  });
  return (
    <div className="bg-[rgba(0,0,0,0.6)] left-0 w-full h-screen fixed top-0 z-[9999]">
      {children}
    </div>
  );
};

export default NotificationOverlay;
