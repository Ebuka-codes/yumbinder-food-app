import React, { SetStateAction, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

type SidebarType = {
  setSidebarOpen: React.Dispatch<SetStateAction<boolean>>;
  setRecipeSidebarOpen: React.Dispatch<SetStateAction<boolean>>;
};

const Sidebar = ({ setSidebarOpen, setRecipeSidebarOpen }: SidebarType) => {
  return (
    <nav className="bg-white w-[300px] h-screen py-3 px-5 z-[20000] fixed top-[7px] mt-10  transition sidebar overflow-y-auto">
      <ul className="py-2 space-y-6 font-medium text-xl">
        <li>
          <NavLink to={'/'} onClick={() => setSidebarOpen(false)}>
            Home
          </NavLink>
        </li>
        <li>
          <span className="flex items-center justify-between">
            <p onClick={() => setRecipeSidebarOpen(true)}>Recipe</p>

            <span onClick={() => setRecipeSidebarOpen(true)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-5"
              >
                <path
                  fillRule="evenodd"
                  d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </span>
        </li>
        <li>
          <NavLink to={'/about'} onClick={() => setSidebarOpen(false)}>
            About us
          </NavLink>
        </li>
        <li>
          <NavLink to={'/contact'} onClick={() => setSidebarOpen(false)}>
            Contact
          </NavLink>
        </li>
        <li>
          <Link to={'/blog'} onClick={() => setSidebarOpen(false)}>
            Blog
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
