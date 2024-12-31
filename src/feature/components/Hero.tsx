import React from 'react';
import { Link } from 'react-router-dom';
import { useGetSavedRecipe } from '../recipe/useGetSavedRecipe';
import { useGetUser } from '../authentication/useGetUser';

const Hero = () => {
  const { data, isLoading } = useGetSavedRecipe();
  const { user } = useGetUser();
  return (
    <div>
      <article className="hero lg:mt-20 mt-10 z-50 ">
        <figure className="relative">
          <Link to={'/recipes/Chicken Enchilada Casserole'}>
            <img
              className="w-full object-cover h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px]"
              src="/image/qtuwxu1468233098.jpg"
              alt="heroImage"
            />

            {!isLoading && (
              <span className="bg-white shadow-sm p-2  hover:bg-stone-300 duration-300 ease-in-out absolute bottom-5 right-5 lg:right-10 cursor-pointer rounded-full">
                {user && data?.find((data) => data.data.id === '52765') && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="size-5 text-[#fb902a]"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2c-1.716 0-3.408.106-5.07.31C3.806 2.45 3 3.414 3 4.517V17.25a.75.75 0 0 0 1.075.676L10 15.082l5.925 2.844A.75.75 0 0 0 17 17.25V4.517c0-1.103-.806-2.068-1.93-2.207A41.403 41.403 0 0 0 10 2Z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}

                {user && !data?.find((data) => data.data.id === '52765') && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                    />
                  </svg>
                )}

                {!user && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                    />
                  </svg>
                )}
              </span>
            )}
          </Link>
        </figure>
        <figure className="ml-5 lg:ml-0">
          <span className="uppercase text-[#fb902a] text-[14px] font-semibold leading-2">
            Recipe of the day
          </span>
          <Link
            to="/recipes/Chicken Enchilada Casserole"
            className="text-2xl lg:text-[2rem] capitalize font-medium leading-10"
          >
            <h2> Chicken Enchilada Casserole </h2>
          </Link>
          <p className="leading-9 italic">By Sam Sifton</p>
          <p className="text-[#333] text-[16px] mb-2 leading-7">
            Consider the clear, rich fat that runs into the pan the perfect
            vehicle for Yorkshire pudding.
          </p>
          <span className="flex items-center my-3 lg:my-5 ">
            {Array.from({ length: 5 }, () => (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-4 text-[#fb902a]"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  clipRule="evenodd"
                />
              </svg>
            ))}
            <p className="text-sm">4,519 </p>
          </span>
          <p className="text-sm">
            1 hour 15 minutes, after 3 hours' room temperature sitting
          </p>
        </figure>
      </article>
    </div>
  );
};

export default Hero;
