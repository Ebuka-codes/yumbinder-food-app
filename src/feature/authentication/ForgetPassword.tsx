import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useResetPassword } from './useResetPassword';
import { Toaster } from 'react-hot-toast';

const ForgetPassword = () => {
  const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const { handleSubmit, register, formState, reset } = useForm();
  const { reset: resetPassword, isReseting } = useResetPassword();
  const navigate = useNavigate();
  const onsubmit = ({ email }: any) => {
    resetPassword(email);
    reset();
  };
  useEffect(() => {
    document.title = 'Rest Password - Yumbinder';
    document.documentElement.style.overflowY = 'auto';
  });

  return (
    <section>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        width="24"
        className="ml-5 mt-6 block lg:hidden"
        onClick={() => navigate('/auth/login')}
      >
        <path d="m12 19.875-7.85-7.85L12 4.175l1.2 1.2L7.375 11.2H19.85v1.65H7.375l5.825 5.825Z"></path>
      </svg>
      <div className="flex justify-center  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  w-[90%] lg:w-[80%] mx-auto items-center flex-col">
        <span className="flex items-center gap-2">
          <img
            src="\image\logo 1.png"
            alt="logo"
            className="w-[64px] h-[64px] object-cover"
          />
        </span>
        <h1 className="text-center text-[16px] mt-4 font-medium">
          Enter your email address to reset your password.
        </h1>
        <form
          action=""
          onSubmit={handleSubmit(onsubmit)}
          className="my-5  w-[90%] sm:w-[65%] md:w-[60%] lg:w-[40%]"
          autoComplete="off"
        >
          <div className="flex flex-col">
            <label htmlFor="email" className="font-medium text-sm mb-1">
              Email Address
            </label>
            <input
              type="email"
              // disabled={isLoading}
              {...register('email', {
                required: 'Email field is required',
                pattern: {
                  value: emailRegex,
                  message: 'Please enter a valid email address',
                },
              })}
              name="email"
              autoComplete="off"
              className="outline-none border border-stone-600 focus:border-[#f8982d] focus:border-2 rounded-[4px] text-sm w-full py-4 px-3"
            />
            <small className="text-red-500 text-[13px]">
              {formState.errors?.email?.message as string}
            </small>
          </div>
          <button
            type="submit"
            className="bg-[#f8982d]  my-5 transform duration-300 ease-in-out text-white font-semibold text-[14px] rounded-[3px] w-full mt-5 py-3"
          >
            {isReseting ? 'Resetting..' : 'Reset Password'}
          </button>
          <div className="font-normal text-[16px] text-center text-stone-500">
            I remember now! <br /> Don’t have an account?{' '}
            <Link to="/auth/signUp" className="text-[#f8982d]">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
      <Toaster />
    </section>
  );
};

export default ForgetPassword;
