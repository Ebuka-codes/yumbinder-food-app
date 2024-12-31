import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGetRecipeByName } from '../recipe/useGetRecipeByName';
const Topics = () => {
  const { name } = useParams();
  const [isLoadingImage, setIsLoadingImage] = useState(true);
  const {
    data: recipe,
    isLoading: isLoadingRecipe,
    isError,
  } = useGetRecipeByName(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`
  );

  const [isHoveredId, setIsHoveredId] = useState<string>('');
  const handleMouseEnter = (id: string) => {
    setIsHoveredId(id);
  };
  const handleMouseLeave = () => {
    setIsHoveredId('');
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
    // const fetchRecipeDetail = async () => {
    //   try {
    //     setIsLoading(true);
    //     setErrorMessage('');
    //     const res = await fetch(
    //       `https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`
    //     );
    //     const data = await res.json();
    //     if (data.meals === null) {
    //       setErrorMessage('Not Found');
    //       return;
    //     }
    //     setData(data.meals);
    //   } catch (error: any) {
    //     setErrorMessage(error.message);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };
    // fetchRecipeDetail();
  }, []);

  return (
    <section className="mt-14 overflow-y-hidden mb-40">
      <div className="mt-5 w-[90%] xl:w-[85%] mx-auto overflow-y-hidden">
        <h1 className="font-bold text-[2.2rem] text-stone-900 capitalize">
          {name} Recipes
        </h1>
        <p className="leading-10 text-[17px]">
          {`To get ${name} recipes like these delivered to your inbox, sign up
          for The Veggie newsletter.`}
        </p>
        <div className="mt-10">
          <div className="border-b-2 border-stone-900 w-[100%]"></div>
          <p className="font-bold text-[14px] py-2 uppercase">
            Featured Recipe Collections
          </p>
          {isLoadingRecipe && (
            <div className="topic-loader-container">
              <div className="topic-loader"></div>
            </div>
          )}

          <div className="grid grid-cols-2 mt-5 md:grid-cols-3 lg:grid-cols-4 gap-5 w-[100%]">
            {!isLoadingRecipe &&
              !isError &&
              recipe?.map((item: any) => (
                <article
                  className="cursor-pointer bg-white border border-[#e6e6e6] card h-[250px] w-full"
                  key={item.idMeal}
                >
                  <figure>
                    <Link
                      to={`/recipes/${encodeURIComponent(
                        item?.strMeal.trim().replace(/\s+/g, '-')
                      )}`}
                    >
                      {isLoadingImage && (
                        <div className="bg-stone-200 animate-pulse w-full  h-[120px] md:h-[140px] "></div>
                      )}
                      <img
                        src={item.strMealThumb}
                        alt={item.strMeal}
                        onLoad={() => setIsLoadingImage(false)}
                        className="w-full object-cover object-center overflow-hidden h-[120px] md:h-[140px]"
                      />
                    </Link>
                  </figure>
                  <section className="py-2 px-3">
                    <Link to={`/recipes/${item.strMeal}`}>
                      <p className=" text-sm p-1">{item.strCategory}</p>
                      <h3 className="title font-bold ">{item.strMeal}</h3>
                    </Link>
                    <div className="py-5">
                      <Link
                        to={`recipes/${item.strMeal}`}
                        className="flex items-center gap-1"
                      >
                        <span className="flex items-center">
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
                        <span className="text-xs"></span>
                      </Link>
                      <div className="py-1 flex items-center justify-between gap-2">
                        <Link
                          to={`/recipes/${item.strMeal}`}
                          className="text-[12px] text-stone-600"
                        >
                          <p>{Math.floor(2).toLocaleString()} minutes</p>
                        </Link>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          className="size-6 text-stone-400 cursor-pointer"
                          onMouseEnter={() =>
                            handleMouseEnter('Cheesy Green Chile Bean Bake')
                          }
                          onMouseLeave={handleMouseLeave}
                          style={{
                            fill: isHoveredId === '1000' ? '#eeee' : 'none',
                            stroke:
                              isHoveredId === '1000'
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
                      </div>
                    </div>
                  </section>
                </article>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default Topics;
