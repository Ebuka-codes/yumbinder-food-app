import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MiniLoading from '../feature/ui/MiniLoading';
import ReactPlayer from 'react-player';
import toast from 'react-hot-toast';
import { useGetUser } from '../feature/authentication/useGetUser';
import { useSavedRecipe } from '../feature/recipe/useSavedRecipe';
import { useGetSavedRecipe } from '../feature/recipe/useGetSavedRecipe';
import { useGetRecipeByName } from '../feature/recipe/useGetRecipeByName';

const RecipePage = () => {
  const { name } = useParams();
  const query = name?.replaceAll('-', ' ').replaceAll(' ', '%20');
  const [instruction, setInstruction] = useState(false);
  const { user } = useGetUser();
  const { savedRecipe, isLoading: isSaving } = useSavedRecipe();
  const { data } = useGetSavedRecipe();
  const { data: recipe, isLoading: isLoadingRecipe } = useGetRecipeByName(
    `https:/www.themealdb.com/api/json/v1/1/search.php?s=${query}`
  );

  const handleSavedRecipes = (recipe: any) => {
    const data = {
      id: recipe.idMeal,
      title: recipe.strMeal,
      category: recipe.strCategory,
      area: recipe.strArea,
      instructions: recipe.strInstructions,
      image: recipe.strMealThumb,
      userid: user?.uid as string,
    };

    if (user) {
      savedRecipe(data);
    }
    if (!user) {
      console.error('User is not logged in.');
      return;
    }
  };
  useEffect(() => {
    window.scrollTo({ top: 0 });
    document.title = `${query?.replaceAll('%20', ' ')} Recipe -  Spicydish`;
    // const fetchRecipeDetail = async () => {
    //   try {
    //     setIsLoading(true);

    //     const res = await fetch(
    //       `https:/www.themealdb.com/api/json/v1/1/search.php?s=${query}`
    //     );
    //     const data = await res.json();

    //     if (data.meals === null) {
    //       return;
    //     }
    //     setRecipeDetail(data.meals);
    //   } catch (error: any) {
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };
    // fetchRecipeDetail();
  }, [query]);
  if (isLoadingRecipe) return <MiniLoading />;
  return (
    <section className="mt-14">
      {/* moblie-view */}
      {recipe?.map((item: any) => (
        <div className="block lg:hidden">
          <div className="w-full">
            <h1 className="text-[26px] p-5 lg:p-0  font-medium leading-[1.2] tracking-[.01em] lg:mt-5">
              {item.strMeal}
            </h1>

            <div className="lg:mt-10 space-y-2 px-5 lg:px-0">
              <h3 className="font-semibold text-[15px] italic">
                By Ali Slagle{' '}
              </h3>
              <p>Published Jan. 22, 2024</p>
            </div>
          </div>
          <img
            src={item?.strMealThumb}
            alt={item.strMeal}
            className="h-[250px] sm:h-[400px] w-full object-cover  lg:hidden block mt-5"
          />
          <div className="stats_cookingTimeTable my-10 mx-5 lg:hidden block">
            <dt>Category</dt>
            <dd>{item.strCategory}</dd>
            <dt>Area</dt>
            <dd>{item.strArea}</dd>
            <dt>Ratings</dt>
            <dd className="flex items-center gap-2">
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
              <p>(451) </p>
            </dd>
          </div>

          <div className="border-b border-[#ccc] mt-[10px] w-[90%]  mx-auto block lg:hidden"></div>

          <div className="mt-10 w-full">
            <div className="mt-5 mx-5">
              <p className="mt-3 space-y-10 leading-[30px]"></p>
              {instruction
                ? item?.strInstructions
                : item?.strInstructions.slice(0, 800) + '...'}
            </div>
            <button
              className="mt-5 font-semibold text-sm border-b border-b-stone-700 hover:text-[#ff9d41f3] duration-300 ease-in-out mx-6 lg:mx-0"
              onClick={() => setInstruction((open) => !open)}
            >
              {instruction ? 'Read Less' : 'Read More'}
            </button>
          </div>

          <div className="ml-5">
            {user && !data?.find((data) => data.data.id === item.idMeal) && (
              <button
                disabled={isSaving}
                className="bg-[#fb902a] hover:bg-[#ff9d41f3] duration-300 ease-in-out text-white font-medium text-[16px] flex items-center gap-1 justify-center mt-4 rounded-full px-3 py-2 w-[100px]"
                onClick={() => handleSavedRecipes(item)}
              >
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
                Save{' '}
              </button>
            )}

            {user && data?.find((data) => data.data.id === item.idMeal) && (
              <button
                disabled={true}
                className="bg-[#fb902a] hover:bg-[#ff9d41f3] duration-300 ease-in-out text-white font-medium text-[16px] flex items-center gap-1 justify-center mt-4 rounded-full px-3 py-2 w-[100px]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="size-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2c-1.716 0-3.408.106-5.07.31C3.806 2.45 3 3.414 3 4.517V17.25a.75.75 0 0 0 1.075.676L10 15.082l5.925 2.844A.75.75 0 0 0 17 17.25V4.517c0-1.103-.806-2.068-1.93-2.207A41.403 41.403 0 0 0 10 2Z"
                    clipRule="evenodd"
                  />
                </svg>
                Saved {''}
              </button>
            )}
            {!user && (
              <button
                className="bg-[#fb8f2aef] hover:bg-[#ff9d41f3] duration-300 ease-in-out text-white font-medium text-[16px] flex items-center gap-1 justify-center mt-4 rounded-full px-3 py-2 w-[100px]"
                onClick={() =>
                  toast.success('Login to save recipe', {
                    id: 'success',
                  })
                }
              >
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
                Save{' '}
              </button>
            )}
          </div>
          <div className="mt-5 mx-5 lg:mx-0">
            <h2 className="mt-10 mb-1 w-full text-[20px] font-semibold border-t border-[#ccc] pt-5  ">
              Watch how to Prepare it?
            </h2>
            <ReactPlayer
              url={item.strYoutube}
              width={'100%'}
              height={360}
              controls
              style={{ marginTop: 30, marginBottom: 40 }}
            ></ReactPlayer>
          </div>
        </div>
      ))}

      {/* destop-view */}
      <div className="recipe-page-container w-full lg:w-[96%] mx-auto mb-10">
        {recipe?.map((item: any) => (
          <>
            <div className="lg:p-20  lg:mt-10 w-full">
              <h1 className="text-[30px] p-7 lg:p-0 lg:text-[2.5rem] font-medium leading-[1.2]  tracking-[.01em] lg:mt-5">
                {item.strMeal}
              </h1>

              <div className="lg:mt-10 space-y-2 px-7 lg:px-0">
                <h3 className="font-semibold text-[15px] italic">
                  By Ali Slagle{' '}
                </h3>
                <p>Updated Jan. 22, 2024</p>
              </div>

              <div className="border-b border-[#ccc] mt-[120px] w-full"></div>
              <div className=" mt-10 space-y-1">
                <div className="stats_cookingTimeTable">
                  <dt>Category</dt>
                  <dd>{item.strCategory}</dd>
                  <dt>Area</dt>
                  <dd>{item.strArea}</dd>
                  <dt>Ratings</dt>
                  <dd className="items-center gap-2 ">
                    {Array.from({ length: 5 }, () => (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-4 text-[#fb902a] "
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ))}
                    <p>(451) </p>
                  </dd>
                </div>
                <div>
                  {user &&
                    !data?.find((data) => data.data.id === item.idMeal) && (
                      <button
                        disabled={isSaving}
                        className="bg-[#fb902a] hover:bg-[#ff9d41f3] duration-300 ease-in-out text-white font-medium text-[16px] flex items-center gap-1 justify-center mt-4 rounded-full px-3 py-2 w-[100px]"
                        onClick={() => handleSavedRecipes(item)}
                      >
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
                        Save{' '}
                      </button>
                    )}

                  {user &&
                    data?.find((data) => data.data.id === item.idMeal) && (
                      <button
                        disabled={true}
                        className="bg-[#fb902a] hover:bg-[#ff9d41f3] duration-300 ease-in-out text-white font-medium text-[16px] flex items-center gap-1 justify-center mt-4 rounded-full px-3 py-2 w-[100px]"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="size-5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 2c-1.716 0-3.408.106-5.07.31C3.806 2.45 3 3.414 3 4.517V17.25a.75.75 0 0 0 1.075.676L10 15.082l5.925 2.844A.75.75 0 0 0 17 17.25V4.517c0-1.103-.806-2.068-1.93-2.207A41.403 41.403 0 0 0 10 2Z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Saved {''}
                      </button>
                    )}
                  {!user && (
                    <button
                      className="bg-[#fb8f2aef] hover:bg-[#ff9d41f3] duration-300 ease-in-out text-white font-medium text-[16px] flex items-center gap-1 justify-center mt-4 rounded-full px-3 py-2 w-[100px]"
                      onClick={() =>
                        toast.success('Login to save recipe', {
                          id: 'success',
                        })
                      }
                    >
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
                      Save{' '}
                    </button>
                  )}
                </div>

                <div className="mt-20 mx-5 lg:mx-0">
                  <h2 className="mt-10 mb-1 w-full text-[20px] font-semibold border-t border-[#ccc] pt-5  ">
                    Watch how to Prepare it?
                  </h2>
                  <ReactPlayer
                    url={item.strYoutube}
                    width={400}
                    height={360}
                    controls
                    style={{ marginTop: 30, marginBottom: 40 }}
                  ></ReactPlayer>
                </div>
              </div>
            </div>

            <div className="mr-20">
              <img
                src={item?.strMealThumb}
                alt=""
                className="h-[450px] w-full object-cover"
              />
              <div className="mt-5">
                <h3 className="font-semibold text-lg">
                  How to make {item.strMeal}
                </h3>
                <p className="mt-3 space-y-10 leading-[30px]"></p>
                {instruction
                  ? item?.strInstructions
                  : item?.strInstructions.slice(0, 800) + '...'}
              </div>
              <button
                className="mt-5  font-semibold text-sm border-b border-b-stone-700 hover:text-[#ff9d41f3] duration-300 ease-in-out"
                onClick={() => setInstruction((open) => !open)}
              >
                {instruction ? 'Read Less' : 'Read More'}
              </button>
            </div>
          </>
        ))}
      </div>
    </section>
  );
};
export default RecipePage;
