import React, { useEffect } from 'react';
import { RiWifiOffFill } from 'react-icons/ri';
import { useFoodData } from '../useGetRecipesByCategories';
import { Navigate } from 'react-router-dom';

const Error = () => {
  const { beefQuery, seafoodQuery, vegetarianQuery, chickenQuery, pastaQuery } =
    useFoodData();
  let isError = false;

  if (
    beefQuery.isError ||
    seafoodQuery.isError ||
    vegetarianQuery.isError ||
    pastaQuery.isError ||
    chickenQuery.isError
  ) {
    isError = true;
  }
  const handleReload = () => {
    window.location.reload();
    if (!isError) {
      Navigate({ to: '/' });
    }
  };
  useEffect(() => {
    document.title = '404 not found';
  });
  return (
    <div className="container">
      <div className="bg-stone-50 rounded-full w-[50px] h-[50px] flex flex-col items-center mb-3 mx-auto ">
        <RiWifiOffFill
          style={{
            fontSize: 30,
            color: '#ff922b',
            marginTop: '10px',
          }}
        />
      </div>

      <h1>No internet connection</h1>
      <p>Make sure Wi-Fi or cellular data is turned on, then try again.</p>
      <button
        onClick={handleReload}
        style={{
          backgroundColor: '#ff922b',
          padding: '5px',
          color: '#ffff',
          fontSize: 16,
          fontWeight: 600,
          outline: 'none',
          width: '130px',
          border: '1px solid #ff922b',
          margin: '15px 0px',
          cursor: 'pointer',
          borderRadius: '5px',
        }}
      >
        Retry
      </button>
    </div>
  );
};

export default Error;
