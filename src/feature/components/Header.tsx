import React, { SetStateAction, useEffect, useRef, useState } from 'react';
import Logo from '../ui/Logo';
import { HiOutlineUser } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import { useGetUser } from '../authentication/useGetUser';
import { useSignOut } from '../authentication/useSignOut';
import { useGetSavedRecipe } from '../recipe/useGetSavedRecipe';

type HeaderType = {
  setSaveRecipe: React.Dispatch<SetStateAction<boolean>>;
  setSearchResult: React.Dispatch<SetStateAction<boolean>>;
  setSearchValue: React.Dispatch<SetStateAction<string>>;
  setSidebarOpen: React.Dispatch<SetStateAction<boolean>>;
  isSidebarOpen: boolean;
  setValue: React.Dispatch<SetStateAction<string>>;
  searchValue: string;
};
const Header = ({
  setSaveRecipe,
  setSearchResult,
  setSearchValue,
  searchValue,
  setValue,
  setSidebarOpen,
  isSidebarOpen,
}: HeaderType) => {
  const [isOpen, setOpen] = useState(false);
  const [isRecipeOpen, setRecipeOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const userIconRef = useRef<HTMLDivElement | null>(null);
  const recipeRef = useRef<HTMLParagraphElement | null>(null);
  const recipeDropdownRef = useRef<HTMLUListElement | null>(null);
  const recipeCategory: string[] = [
    'vegetarian',
    'seafood',
    'beef',
    'pasta',
    'chicken',
  ];
  const { user } = useGetUser();
  const { signOut } = useSignOut();
  const { data } = useGetSavedRecipe();

  const handleRecipe = () => {
    setRecipeOpen((open) => !open);
  };

  const handleClick = () => {
    setRecipeOpen(false);
  };
  const handleSubmitSearch = () => {
    if (searchValue !== '') {
      setValue(searchValue);
      setSearchValue('');
      setSearchResult(true);
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setSearchResult(true);
      setValue(searchValue);
      setSearchValue('');
    }
  };
  const handleToggleUser = () => {
    setOpen((prev) => !prev);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node) &&
      userIconRef.current &&
      !userIconRef.current.contains(e.target as Node)
    ) {
      setOpen(false);
    }

    if (
      recipeDropdownRef.current &&
      !recipeDropdownRef.current.contains(e.target as Node) &&
      recipeRef.current &&
      !recipeRef.current.contains(e.target as Node)
    ) {
      setRecipeOpen(false);
    }
  };
  const handleSignOut = () => {
    signOut();
  };
  useEffect(() => {
    if (isOpen || isRecipeOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else document.removeEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, isRecipeOpen]);
  return (
    <header className="w-full bg-white lg:fixed lg:top-0 py-[10px] h-[55px] lg:h-[60px]  left-0 z-[9999] border-b border-t-0 border-b-[#dbdbdb]">
      <div className="w-[95%] xl:w-[85%] mx-auto mb-2">
        {/* mobile-screen */}
        <div className="flex items-center justify-between gap-5 lg:hidden">
          <div className="flex items-center gap-2">
            <span onClick={() => setSidebarOpen((show) => !show)}>
              {isSidebarOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M22 6a1 1 0 0 1-1 1H3a1 1 0 0 1 0-2h18a1 1 0 0 1 1 1Zm0 6a1 1 0 0 1-1 1H3a1 1 0 1 1 0-2h18a1 1 0 0 1 1 1Zm-1 7a1 1 0 1 0 0-2H3a1 1 0 1 0 0 2h18Z"
                    fill="#222"
                  ></path>
                </svg>
              )}
            </span>
            <svg
              width="24"
              height="24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="lg:hidden"
              onClick={() => {
                setSearchResult(true);
                setSidebarOpen(false);
              }}
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="m19.56 17.44-3.532-3.534A6.46 6.46 0 0 0 17 10.5a6.5 6.5 0 1 0-6.5 6.5 6.46 6.46 0 0 0 3.407-.973l3.533 3.533c.292.293.676.44 1.06.44s.768-.147 1.06-.44a1.496 1.496 0 0 0 0-2.12ZM10.5 15a4.5 4.5 0 1 1 0-9.002 4.5 4.5 0 0 1 0 9.002Z"
                fill="#222"
              ></path>
            </svg>
          </div>
          <div>
            <Logo />
          </div>
          <div className="flex items-center gap-5">
            {user ? (
              <span ref={userIconRef}>
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={handleToggleUser}
                >
                  <path
                    d="M16 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM18.998 16.571A1.06 1.06 0 0 0 19 16.5c0-1.38-3.686-3-7-3s-7 1.62-7 3c0 .024 0 .048.002.071H5V19a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.429h-.002Z"
                    fill="#121212"
                  ></path>
                </svg>
              </span>
            ) : (
              <Link to={'/auth/login'}>
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM18.998 16.571A1.06 1.06 0 0 0 19 16.5c0-1.38-3.686-3-7-3s-7 1.62-7 3c0 .024 0 .048.002.071H5V19a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.429h-.002Z"
                    fill="#121212"
                  ></path>
                </svg>
              </Link>
            )}
          </div>
        </div>
        <nav className="flex justify-between items-center overflow-hidden">
          <div className="hidden lg:block">
            <Logo />
          </div>
          <ul className="hidden items-center gap-10 font-medium text-sm text-stone-700 uppercase xl:flex">
            <li className=" transform duration-300 ease-in-out">
              <Link
                className="hover:text-[#f8982d] transition duration-300 ease-in-out"
                to={'home'}
              >
                Home
              </Link>
            </li>
            <li className="cursor-pointer">
              <p
                className="hover:text-[#f8982d] transition duration-300 ease-in-out"
                onClick={handleRecipe}
                ref={recipeRef}
              >
                Recipes
              </p>
              {isRecipeOpen && (
                <ul
                  ref={recipeDropdownRef}
                  className="bg-white shadow-md p-4 w-[200px] border border-stone-200 absolute rounded-md top-14 mt-1"
                >
                  {recipeCategory.map((recipe, index) => (
                    <Link to={`/topics/${recipe}`} key={index}>
                      <li
                        onClick={handleClick}
                        className="py-2 hover:text-[#f8982d] transition duration-300 ease-in-out"
                      >
                        {recipe}
                      </li>
                    </Link>
                  ))}
                </ul>
              )}
            </li>
            <li>
              <Link
                to={'/about'}
                className="hover:text-[#f8982d] transition duration-300 ease-in-out cursor-pointer"
              >
                About Us
              </Link>
            </li>
            <li className="relative inline-block">
              <Link
                to={'/contact'}
                className="hover:text-[#f8982d] transition-all cursor-pointer"
              >
                Contact
              </Link>
            </li>
            <li className="relative inline-block">
              <Link
                to={'/blog'}
                className="hover:text-[#f8982d] transition-all cursor-pointer"
              >
                Blog
              </Link>
            </li>
          </ul>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={searchValue}
                placeholder="What would you like to cook?"
                className=" hidden lg:block   bg-slate-50 outline-none rounded-[20px] p-[6px] px-3 pl-5 w-[250px] text-sm placeholder:text-sm placeholder:text-stone-500 "
                onChange={(e) => setSearchValue(e.target.value.trim())}
                onKeyDown={handleKeyDown}
              />
              <button
                className="rounded-full bg-slate-50 duration-300 ease-in-out p-2 outline-none cursor-pointer hidden lg:block"
                onClick={handleSubmitSearch}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-4 text-black"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            {user ? (
              <span
                className="bg-stone-800 rounded-full p-2 cursor-pointer hidden lg:block"
                ref={userIconRef}
              >
                <HiOutlineUser
                  className="text-[16px] text-white"
                  onClick={handleToggleUser}
                />
              </span>
            ) : (
              <Link
                to={'auth/login'}
                className="bg-stone-800 rounded-full p-2 cursor-pointer hidden lg:block"
              >
                <HiOutlineUser
                  className="text-[16px] text-white"
                  onClick={handleToggleUser}
                />
              </Link>
            )}
          </div>
        </nav>
        {user && isOpen && (
          <div
            className="bg-white shadow-md border border-stone-200 py-5 rounded-md absolute  top-[54px] lg:top-[60px] right-3 z-[9999]"
            ref={dropdownRef}
          >
            <ul>
              <p className=" px-3 text-sm">{user?.email}</p>

              <hr className="mt-2" />
              <li
                className="py-2 mt-2  flex items-center gap-2  px-3 hover:bg-slate-50 text-[14px] cursor-pointer  transform duration-150"
                onClick={() => {
                  setSaveRecipe(true);
                  setOpen(false);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                  />
                </svg>
                Saved Recipes{' '}
                <span className="text-[#f8982d]">({data?.length})</span>
              </li>

              <li className="py-2  px-3 mt-2 hover:bg-slate-50 text-[14px] cursor-pointer  transform duration-150">
                <span
                  className="flex items-center gap-2"
                  onClick={handleSignOut}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.5 3.75A1.5 1.5 0 0 0 6 5.25v13.5a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5V15a.75.75 0 0 1 1.5 0v3.75a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3V5.25a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3V9A.75.75 0 0 1 15 9V5.25a1.5 1.5 0 0 0-1.5-1.5h-6Zm10.72 4.72a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06l1.72-1.72H9a.75.75 0 0 1 0-1.5h10.94l-1.72-1.72a.75.75 0 0 1 0-1.06Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Logout
                </span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};
export default Header;
