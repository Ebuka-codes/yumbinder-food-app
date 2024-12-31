import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import { useFoodData } from '../useGetRecipesByCategories';
import Error from '../components/Error';
import Overlay from './Overlay';
import SavedRecipe from '../components/SavedRecipe';
import SearchResult from '../components/SearchResult';
import Sidebar from '../components/Sidebar';
import SideBarOverlay from './SideBarOverlay';
import RecipeSidebar from '../components/RecipeSidebar';
import { Toaster } from 'react-hot-toast';
import NewsLetter from '../components/NewsLetter';
import Footer from '../components/Footer';
import { useGetUser } from '../authentication/useGetUser';

const AppLayout = () => {
  let isError = false;
  const { beefQuery, seafoodQuery, vegetarianQuery, chickenQuery, pastaQuery } =
    useFoodData();
  const [searchValue, setSearchValue] = useState('');
  const [value, setValue] = useState('');
  const [searchData, setSearchData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSaveRecipeOpen, setSaveRecipe] = useState(false);
  const [isSearchResultOpen, setSearchResult] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isRecipeSidebarOpen, setRecipeSidebarOpen] = useState(false);
  const { user } = useGetUser();

  if (!isSaveRecipeOpen) {
    document.documentElement.style.overflowY = 'auto';
  }
  if (!isSearchResultOpen) {
    document.documentElement.style.overflowY = 'auto';
  }
  if (isSearchResultOpen) {
    document.documentElement.style.overflowY = 'hidden';
  }

  if (
    beefQuery.isError ||
    seafoodQuery.isError ||
    vegetarianQuery.isError ||
    pastaQuery.isError ||
    chickenQuery.isError
  ) {
    isError = true;
  }
  useEffect(() => {
    const fetchRecipeDetail = async () => {
      try {
        setIsLoading(true);
        setErrorMessage('');
        const res = await fetch(
          `https:/www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`
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
  }, [searchValue, user]);

  if (isError) {
    return <Error />;
  }
  return (
    <div className="flex min-h-screen flex-col z-[9999]">
      <main className="mx-auto min-h-screen w-[100%]  lg:mt-[12px] relative">
        <Header
          setSaveRecipe={setSaveRecipe}
          setSearchResult={setSearchResult}
          setSearchValue={setSearchValue}
          searchValue={searchValue}
          setValue={setValue}
          setSidebarOpen={setSidebarOpen}
          isSidebarOpen={isSidebarOpen}
        />
        {isSidebarOpen && (
          <SideBarOverlay>
            {isRecipeSidebarOpen ? (
              <RecipeSidebar
                setRecipeSidebarOpen={setRecipeSidebarOpen}
                setSidebarOpen={setSidebarOpen}
              />
            ) : (
              <Sidebar
                setSidebarOpen={setSidebarOpen}
                setRecipeSidebarOpen={setRecipeSidebarOpen}
              />
            )}
          </SideBarOverlay>
        )}
        <div>
          <Outlet />
          {isSaveRecipeOpen && (
            <Overlay
              setSaveRecipe={setSaveRecipe}
              setSearchResult={setSearchResult}
            >
              {isSaveRecipeOpen && (
                <SavedRecipe setSaveRecipe={setSaveRecipe} />
              )}
            </Overlay>
          )}

          {isSearchResultOpen && (
            <Overlay
              setSearchResult={setSearchResult}
              setSaveRecipe={setSaveRecipe}
            >
              <SearchResult
                data={searchData}
                isLoading={isLoading}
                errorMessage={errorMessage}
                searchValue={searchValue}
                value={value}
                setValue={setValue}
                setSearchResult={setSearchResult}
              />
            </Overlay>
          )}
        </div>
        <Toaster />
      </main>
      {/* {!isLoggedIn && (
        <NotificationOverlay>
          <Notification setNotificationOpen={setNotificationOpen} />
        </NotificationOverlay>
      )} */}

      <section>
        <NewsLetter />
        <Footer />
      </section>
    </div>
  );
};
export default AppLayout;
