import React, { SetStateAction } from 'react';
type OverlayType = {
  children: React.ReactNode;
  setSaveRecipe: React.Dispatch<SetStateAction<boolean>>;
  setSearchResult: React.Dispatch<SetStateAction<boolean>>;
};

const Overlay = ({ setSearchResult, setSaveRecipe, children }: OverlayType) => {
  return (
    <div className="bg-[rgba(0,0,0,0.6)] left-0 w-full h-screen fixed top-0 z-[9999]">
      <div className="text-white flex gap-2 items-center justify-center  mt-20 font-medium">
        <span className="bg-[hsl(0,1%,45%)] lg:hover:bg-[hsl(0,1%,45%)]  cursor-pointer duration-300 ease-in-out  rounded-md w-[100px] flex items-center gap-2 justify-center p-2">
          <p
            className="tracking-wider text-sm"
            onClick={() => {
              setSaveRecipe(false);
              setSearchResult(false);
            }}
          >
            Close
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-5 font-bold"
          >
            <path
              fillRule="evenodd"
              d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Overlay;
