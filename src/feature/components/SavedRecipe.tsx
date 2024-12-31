import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetSavedRecipe } from '../recipe/useGetSavedRecipe';
import { savedRecipeType } from '../../type';
import { useDeleteSavedRecipe } from '../recipe/useDeleteSavedRecipe';

const SavedRecipe = ({ setSaveRecipe }: savedRecipeType) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [recipeId, setRecipeId] = useState(null);
  const { data, isLoading } = useGetSavedRecipe();
  const { deleteRecipe, isDeleting } = useDeleteSavedRecipe();

  const handleDeleteRecipe = (recipeId: string) => {
    deleteRecipe(recipeId, {
      onSuccess: () => {
        setIsOpen(false);
      },
    });
  };
  useEffect(() => {
    document.documentElement.style.overflowY = 'hidden';
    return () => {
      document.documentElement.style.overflowY = 'visible';
    };
  });
  return (
    <div className="w-full bg-white z-30 h-screen sticky mt-5 overflow-y-auto top-[50%]">
      <div className="mt-10">
        <h1 className="text-center text-[#fb902a] font-medium">My Account</h1>
        <div className="bg-slate-50  p-5 text-center text-[14px] rounded-md w-[90%] lg:w-[80%] mt-10 mx-auto">
          Protect your saved recipes
        </div>
        <div className="mt-10">
          <h2 className="text-center text-[20px] mb-5">My saved recipes</h2>

          {isLoading && (
            <>
              <div className="saved-recipe-loader-container">
                <div className="saved-recipe-loader"></div>
              </div>
            </>
          )}
          {!isLoading && (
            <div className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5  w-[90%] lg:w-[80%] mx-auto mb-40">
              {data?.map((item: any) => (
                <div className="border border-stone-300 rounded-md">
                  <Link
                    to={`/recipes/${item.data.title}`}
                    className="cursor-pointer"
                    onClick={() => setSaveRecipe(false)}
                  >
                    <img
                      src={item.data.image}
                      alt={item.data.title}
                      className="w-full h-[200px] object-cover rounded-t-md"
                    />
                  </Link>
                  <div className="p-3">
                    <span className="flex items-center justify-between">
                      <Link
                        to={`/recipes/${item.data.title}`}
                        className="leading-8 hover:text-[#fb902a] duration-300 ease-in-out"
                        onClick={() => setSaveRecipe(false)}
                      >
                        {item.data.title}
                      </Link>
                      <span className="relative">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="size-5 cursor-pointer"
                          onClick={() => {
                            setIsOpen((open) => !open);
                            setRecipeId(item.id);
                          }}
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.5 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {isOpen && recipeId === item.id && (
                          <span className="bg-white shadow-sm border border-stone-300 p-2 px-3 cursor-pointer rounded-md text-sm  absolute top-5 right-2">
                            <ul className="hover:text-red-500 duration-300 ease-in-out">
                              {isDeleting ? (
                                <div className="saved_recipe_loader_spinner"></div>
                              ) : (
                                <li onClick={() => handleDeleteRecipe(item.id)}>
                                  Remove
                                </li>
                              )}
                            </ul>
                          </span>
                        )}
                      </span>
                    </span>

                    <p className="text-sm text-stone-500 mt-2">
                      {item.data.instructions.slice(0, 100) + '...'}
                    </p>
                    <div className="flex items-center justify-between gap-2 mt-5">
                      <div className="flex items-center gap-2">
                        <span className="flex gap-2 items-center">
                          {' '}
                          {Array.from({ length: 5 }, () => (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="size-3 text-[#fb902a]"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          ))}
                        </span>
                        <p className="text-stone-500 text-sm">(5)</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default SavedRecipe;
