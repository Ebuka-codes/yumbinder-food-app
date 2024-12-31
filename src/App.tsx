import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './feature/ui/AppLayout';
import Login from './feature/authentication/Login';
import RecipePage from './page/RecipePage';
import ErrorPage from './page/ErrorPage';
import AboutPage from './page/AboutPage';
import ContactPage from './page/ContactPage';
import BlogPage from './page/BlogPage';
import TopicsPage from './page/TopicsPage';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import HomePage from './page/HomePage';
import SignUp from './feature/authentication/SignUp';
import ForgetPassword from './feature/authentication/ForgetPassword';

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={true} />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Navigate replace to="home" />} />
            <Route path="home" element={<HomePage />} />
            <Route path="/recipes/:name" element={<RecipePage />} />
            <Route path="/topics/:name" element={<TopicsPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="blog" element={<BlogPage />} />
          </Route>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<SignUp />} />{' '}
          <Route path="/auth/reset" element={<ForgetPassword />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route
            path="*"
            element={
              <h1 className="mt-20 text-center font-semibold">404 Not Found</h1>
            }
          />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
