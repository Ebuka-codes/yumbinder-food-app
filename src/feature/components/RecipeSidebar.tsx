import React, { SetStateAction } from 'react';
import { Link } from 'react-router-dom';

type RecipeSidebarType = {
  setRecipeSidebarOpen: React.Dispatch<SetStateAction<boolean>>;
  setSidebarOpen: React.Dispatch<SetStateAction<boolean>>;
};
const RecipeSidebar = ({
  setRecipeSidebarOpen,
  setSidebarOpen,
}: RecipeSidebarType) => {
  const recipeCategory = ['vegetarian', 'seafood', 'beef', 'pasta', 'chicken'];
  return (
    <div className="bg-white w-[300px] h-screen py-3 px-5 z-[20000] fixed top-[7px] mt-10  transition sidebar overflow-y-auto">
      <div className="mt-5">
        <h1 className="text-[20px] font-semibold flex items-center gap-5 mb-5">
          <svg
            width="8"
            height="15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => {
              setRecipeSidebarOpen(false);
            }}
          >
            <path
              d="M0 7.496a.966.966 0 0 1 .313-.712L6.448.766A.867.867 0 0 1 7.08.5C7.595.5 8 .9 8 1.413c0 .25-.1.483-.275.661L1.798 7.883V7.11l5.927 5.814a.932.932 0 0 1 .275.663.906.906 0 0 1-.919.913.908.908 0 0 1-.64-.265L.313 8.215C.101 8 0 7.77 0 7.495Z"
              fill="#000"
            ></path>
          </svg>
          Recipes
        </h1>
        <ul className="text-[15px] space-y-4 font-medium ml-4">
          {recipeCategory.map((recipe, index) => (
            <Link
              to={`/topics/${recipe}`}
              key={index}
              className="flex flex-col capitalize"
              onClick={() => {
                setRecipeSidebarOpen(false);
                setSidebarOpen(false);
              }}
            >
              {recipe}
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecipeSidebar;
