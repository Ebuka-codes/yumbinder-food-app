import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useResetPassword } from './useResetPassword';
import { Toaster } from 'react-hot-toast';

const ForgetPassword = () => {
  const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const { handleSubmit, register, formState, reset } = useForm();
  const { reset: resetPassword, isReseting } = useResetPassword();
  const onsubmit = ({ email }: any) => {
    resetPassword(email);
    reset();
  };
  useEffect(() => {
    document.title = 'Rest Password - Yumbinder';
  });

  return (
    <>
      <div className="flex justify-center  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  w-[90%] lg:w-[80%] mx-auto items-center flex-col">
        <span className="flex items-center gap-2">
          <img
            src="\image\logo 1.png"
            alt="logo"
            className="w-[30px] h-[30px] object-cover"
          />
          <h1 className="text-[24px] font-semibold logo text-[#fa9b42]">
            Yumbinder
          </h1>
        </span>
        <h1 className="text-center text-[20px] my-3 font-medium">
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
              className="outline-none border border-stone-600 rounded-[4px] text-sm w-full py-3 px-3"
            />
            <small className="text-red-500 text-[13px]">
              {formState.errors?.email?.message as string}
            </small>
          </div>
          <button
            type="submit"
            className="bg-[#ff9532] uppercase  my-5 hover:bg-[#fb8f2afb] transform duration-300 ease-in-out text-white font-semibold text-[14px] rounded-[3px] w-full mt-5 py-2"
          >
            {isReseting ? 'Resetting..' : 'Reset Password'}
          </button>
          <div className="font-normal text-[16px] text-center text-stone-500">
            I remember now! <br /> Don’t have an account?{' '}
            <Link to="/auth/signUp">Sign Up</Link>
          </div>
        </form>
      </div>
      <Toaster />
    </>
  );
};

export default ForgetPassword;
