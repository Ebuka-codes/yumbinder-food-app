import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Meal } from '../../service/recipeApi';
import { useFoodData } from '../useGetRecipesByCategories';
import { useGetSavedRecipe } from '../recipe/useGetSavedRecipe';
import { useGetUser } from '../authentication/useGetUser';
const Recipe = (recipes: any) => {
  // const min = {};
  const data = recipes.recipes;
  const recipeData = data.map((item: any) => {
    return { ...item, time: Math.random() * 10000 };
  });

  let loading = false;
  const { beefQuery, seafoodQuery, vegetarianQuery, chickenQuery, pastaQuery } =
    useFoodData();
  const { data: saveReciped } = useGetSavedRecipe();
  const { user } = useGetUser();
  const [isHoveredId, setIsHoveredId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  const handleMouseEnter = (id: string) => {
    setIsHoveredId(id);
  };
  const handleMouseLeave = () => {
    setIsHoveredId('');
  };

  if (
    beefQuery.isLoading ||
    seafoodQuery.isLoading ||
    chickenQuery.isLoading ||
    pastaQuery.isLoading ||
    vegetarianQuery.isLoading
  ) {
    loading = true;
  }

  return (
    <section className="mt-20" id="recipe">
      <div className="border-t-2  border-stone-800 w-[85%] mx-auto"></div>
      <div className=" mb-4  py-5 w-full lg:w-[85%] mx-auto relative">
        <img
          src="image/17EATrex-zlkb-master768.webp"
          className="w-[100%] h-[350px] object-cover"
          alt=""
        />
        <div className="absolute top-10 ml-5  bg-white p-5 max-w-[250px] xs:max-w-[300px] ">
          <span>
            <h4 className="font-medium leading-10 text-[18px]">
              ’This the Season!
            </h4>
            <p className="text-[16px]">
              We've got every recipe you need for Christmas, Hanukkah, Kwanzaa
              and more.
            </p>
          </span>
        </div>
      </div>

      <div className="flex items-center justify-center flex-col">
        <h1 className="lg:text-[1.7rem] text-[24px] font-bold">
          Delicious Recipes
        </h1>
        <p className="text-[1rem] w-[90%] lg:w-full  text-center  font-medium">
          Get food recipes like these delivered to your inbox
        </p>
      </div>

      {loading && (
        <div className="search-loader-container overflow-y-hidden mb-20">
          <div className="search-loader"></div>
        </div>
      )}

      {!loading && (
        <div className="mb-10">
          <div className="grid gap-x-5 gap-y-2  grid-cols-2  md:grid-cols-3 lg:grid-cols-4  w-[90%] lg:w-[85%] mx-auto mt-10">
            {recipeData.slice(0, 8)?.map((item: Meal) => (
              <article
                className="cursor bg-white border border-[#e6e6e6] card mt-2 w-full"
                key={item.idMeal}
              >
                <figure>
                  <Link
                    to={`/recipes/${encodeURIComponent(
                      item.strMeal.trim().replace(/\s+/g, '-')
                    )}`}
                  >
                    {isLoading && (
                      <div className="bg-stone-200 animate-pulse w-full  h-[120px] md:h-[140px] "></div>
                    )}

                    <img
                      src={item.strMealThumb}
                      alt={item.strMeal}
                      onLoad={() => setIsLoading(false)}
                      className="w-full  h-[120px] md:h-[140px] sm object-cover object-center overflow-hidden "
                    />
                  </Link>
                </figure>
                <section className="py-2 px-3">
                  <Link
                    to={`/recipes/${encodeURIComponent(
                      item.strMeal.trim().replace(/\s+/g, '-')
                    )}`}
                  >
                    <p className=" text-sm p-1"> {item.strCategory}</p>
                    <h3 className="title font-bold  ">{item.strMeal}</h3>
                  </Link>
                  <div className="pt-4">
                    <Link
                      to={`/recipes/${encodeURIComponent(
                        item.strMeal.trim().replace(/\s+/g, '-')
                      )}`}
                      className="flex items-center gap-1"
                    >
                      <span className="flex items-center">
                        {' '}
                        {Array.from({ length: 5 }, () => (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="size-3 text-[#FF550C]"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ))}
                      </span>
                      <span className="text-xs">
                        {Math.floor(item.time).toLocaleString()}
                      </span>
                    </Link>
                    <div className="py-1 flex items-center justify-between gap-2">
                      <Link
                        to={`/recipes/${encodeURIComponent(
                          item.strMeal.trim().replace(/\s+/g, '-')
                        )}`}
                        className="text-[12px] text-stone-600"
                      ></Link>

                      {user &&
                        saveReciped?.find(
                          (reipe: any) => reipe.data.id === item.idMeal
                        ) && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            strokeWidth={1.5}
                            className="size-6 text-[#eeee]"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 2c-1.716 0-3.408.106-5.07.31C3.806 2.45 3 3.414 3 4.517V17.25a.75.75 0 0 0 1.075.676L10 15.082l5.925 2.844A.75.75 0 0 0 17 17.25V4.517c0-1.103-.806-2.068-1.93-2.207A41.403 41.403 0 0 0 10 2Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      {user &&
                        !saveReciped?.find(
                          (reipe: any) => reipe.data.id === item.idMeal
                        ) && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            className="size-6 text-stone-400 cursor-pointer"
                            onMouseEnter={() => handleMouseEnter(item?.idMeal)}
                            onMouseLeave={handleMouseLeave}
                            style={{
                              fill:
                                isHoveredId === item.idMeal ? '#eeee' : 'none',
                              stroke:
                                isHoveredId === item.idMeal
                                  ? '#eeee'
                                  : 'rgb(168 162 158)',
                            }}
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
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          className="size-6 text-stone-400 cursor-pointer"
                          onMouseEnter={() => handleMouseEnter(item?.idMeal)}
                          onMouseLeave={handleMouseLeave}
                          style={{
                            fill:
                              isHoveredId === item.idMeal ? '#eeee' : 'none',
                            stroke:
                              isHoveredId === item.idMeal
                                ? '#eeee'
                                : 'rgb(168 162 158)',
                          }}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                </section>
              </article>
            ))}
          </div>

          <div className="mt-20">
            <div className="border-t-2  border-stone-800 w-[85%] mx-auto"></div>
            <div className="mt-4 mb-4 py-3 lg:w-[85%] mx-auto relative">
              <img
                src="image/ar-sugar-cookies-threeByTwoMediumAt2X.webp"
                alt=""
                className="object-cover w-[100%]  h-[350px]"
              />
              <div className="absolute top-10 ml-5 bg-white p-5 max-w-[250px] xs:max-w-[300px] ">
                <span>
                  <h4 className="font-medium leading-10 text-[18px]">
                    ’This the Season!
                  </h4>
                  <p className="text-[16px] ">
                    We've got every recipe you need for Christmas, Hanukkah,
                    Kwanzaa and more.
                  </p>
                </span>
              </div>
            </div>
          </div>
          <div className="border-t-2  border-stone-800 w-[85%] mx-auto mt-10"></div>
          <div className="grid gap-x-5 gap-y-2  grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-[90%] lg:w-[85%] mx-auto mt-5  mb-20">
            {recipeData.slice(9, 13)?.map((item: Meal) => (
              <article
                className="cursor-pointer bg-white border border-[#e6e6e6] card mt-3 w-full h-[280px]"
                key={item.idMeal}
              >
                <figure>
                  <Link
                    to={`/recipes/${encodeURIComponent(
                      item.strMeal.trim().replace(/\s+/g, '-')
                    )}`}
                  >
                    {isLoading && (
                      <div className="bg-stone-200 animate-pulse w-full  h-[120px] md:h-[140px] "></div>
                    )}

                    <img
                      src={item.strMealThumb}
                      alt={item.strMeal}
                      onLoad={() => setIsLoading(false)}
                      className="w-full  h-[120px] md:h-[140px] sm object-cover object-center"
                    />
                  </Link>
                </figure>
                <section className="py-2 px-3">
                  <Link
                    to={`/recipes/${encodeURIComponent(
                      item.strMeal.trim().replace(/\s+/g, '-')
                    )}`}
                  >
                    <p className=" text-sm p-1"> {item.strCategory}</p>
                    <h3 className="title font-bold ">{item.strMeal}</h3>
                  </Link>
                  <div className="py-5">
                    <Link
                      to={`/recipes/${encodeURIComponent(
                        item.strMeal.trim().replace(/\s+/g, '-')
                      )}`}
                      className="flex items-center gap-1"
                    >
                      <span className="flex items-center">
                        {' '}
                        {Array.from({ length: 5 }, () => (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="size-3 text-[#FF550C]"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ))}
                      </span>
                      <span className="text-xs">
                        {Math.floor(item.time).toLocaleString()}
                      </span>
                    </Link>
                    <div className="py-1 flex items-center justify-between gap-2">
                      <Link
                        to={`/recipes/${encodeURIComponent(
                          item.strMeal.trim().replace(/\s+/g, '-')
                        )}`}
                        className="text-[12px] text-stone-600"
                      ></Link>
                      {user &&
                        saveReciped?.find(
                          (reipe: any) => reipe.id === item.idMeal
                        ) && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            strokeWidth={1.5}
                            className="size-6 text-[#eeee]"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 2c-1.716 0-3.408.106-5.07.31C3.806 2.45 3 3.414 3 4.517V17.25a.75.75 0 0 0 1.075.676L10 15.082l5.925 2.844A.75.75 0 0 0 17 17.25V4.517c0-1.103-.806-2.068-1.93-2.207A41.403 41.403 0 0 0 10 2Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      {user &&
                        !saveReciped?.find(
                          (reipe: any) => reipe.id === item.idMeal
                        ) && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            className="size-6 text-stone-400 cursor-pointer"
                            onMouseEnter={() => handleMouseEnter(item?.idMeal)}
                            onMouseLeave={handleMouseLeave}
                            style={{
                              fill:
                                isHoveredId === item.idMeal ? '#eeee' : 'none',
                              stroke:
                                isHoveredId === item.idMeal
                                  ? '#eeee'
                                  : 'rgb(168 162 158)',
                            }}
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
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          className="size-6 text-stone-400 cursor-pointer"
                          onMouseEnter={() => handleMouseEnter(item?.idMeal)}
                          onMouseLeave={handleMouseLeave}
                          style={{
                            fill:
                              isHoveredId === item.idMeal ? '#eeee' : 'none',
                            stroke:
                              isHoveredId === item.idMeal
                                ? '#eeee'
                                : 'rgb(168 162 158)',
                          }}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                </section>
              </article>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default Recipe;
