import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const SearchResult = ({
  setSearchResult,
  setValue,
  value,
  data,
  isloading,
}: any) => {
  const [searchData, setSearchData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchRecipeDetail = async () => {
      try {
        setIsLoading(true);
        setErrorMessage('');
        const res = await fetch(
          `https:/www.themealdb.com/api/json/v1/1/search.php?s=${value}`
        );
        const data = await res.json();
        if (data.meals === null) {
          setErrorMessage('Not Found');
          return;
        }
        setSearchData(data.meals);
      } catch (error: any) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRecipeDetail();
  }, [value]);

  return (
    <div className="w-full bg-white z-30 h-screen sticky mt-5 overflow-y-auto top-[50%]">
      <div className="mt-5 w-[95%] mx-auto relative">
        <input
          type="text"
          value={value}
          defaultValue={value}
          placeholder="search text..."
          className="w-[95%] p-2  pl-4 text-sm shadow-sm rounded-full outline-none mx-auto flex flex-col items-center justify-center border"
          onChange={(e) => setValue(e.target.value)}
        />
        {value ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6 text-red-600 absolute top-2 right-12 cursor-pointer "
            onClick={() => {
              setValue('');
            }}
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6 text-red-600 absolute top-2 right-12 cursor-pointer"
          >
            <path
              fillRule="evenodd"
              d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
              clipRule="evenodd"
            />
          </svg>
        )}

        <div className="mt-10 w-[95%] mx-auto relative">
          {!errorMessage && (
            <h2 className="text-[#fb902a] font-medium text-[18px] uppercase tracking-widest">
              Top Result
            </h2>
          )}

          {isloading && (
            <>
              <div className="search-loader-container">
                <div className="search-loader"></div>
              </div>
            </>
          )}
          {!isLoading && errorMessage && (
            <p className="text-sm text-stone-600 text-center mt-10">
              No match found
            </p>
          )}

          {!errorMessage && !isloading && data?.length !== 0 && (
            <div>
              <div className="grid  grid-cols-2 md:grid-cols-4  lg:grid-cols-5 xl:grid-cols-7 gap-5 mt-3 mb-40">
                {searchData?.map((item: any) => (
                  <Link
                    to={`/recipes/${encodeURIComponent(
                      item.strMeal.trim().replace(/\s+/g, '-')
                    )}`}
                    onClick={() => setSearchResult(false)}
                  >
                    <img
                      src={item.strMealThumb}
                      alt=""
                      className="w-full h-[150px] object-cover rounded-[5px]"
                    />
                    <div className="mt-2">
                      <p className="text-[16px] font-medium">{item.strMeal}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
