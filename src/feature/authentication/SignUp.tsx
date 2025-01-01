import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useSignUp } from './useSignUp';

const SignUp = () => {
  const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const strongPasswordRegex: RegExp =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const { handleSubmit, register, formState, reset } = useForm();
  const { signUser, isLoading } = useSignUp();
  const navigate = useNavigate();
  const onsubmit = ({ email, password }: any) => {
    signUser(
      { email, password },
      {
        onSettled: () => {
          reset();
        },
      }
    );
  };
  useEffect(() => {
    document.title = 'Sign up - Yumbinder';
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
      <div className="flex justify-center  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  w-[95%] lg:w-[80%] mx-auto items-center flex-col">
        <span className="flex items-center gap-2">
          <img
            src="\image\logo 1.png"
            alt="logo"
            className="w-[64px] h-[64px] object-cover"
          />
        </span>
        <h1 className="text-center text-[16px] mt-5">
          Enter your email and password <br /> below create an account.
        </h1>
        <div className="my-5  w-[90%] sm:w-[65%] md:w-[60%] lg:w-[40%]">
          <form
            action=""
            onSubmit={handleSubmit(onsubmit)}
            className="space-y-3"
            autoComplete="off"
          >
            <div className="flex flex-col">
              <label htmlFor="email" className="font-medium text-sm mb-1">
                Email Address
              </label>
              <input
                type="email"
                disabled={isLoading}
                {...register('email', {
                  required: 'Email field is required',
                  pattern: {
                    value: emailRegex,
                    message: 'Please enter a valid email address',
                  },
                })}
                name="email"
                autoComplete="off"
                className="outline-none border border-stone-600 rounded-[4px] focus:border-[#f8982d] focus:border-2 text-sm w-full py-4 px-3"
              />
              <small className="text-red-500 text-[13px]">
                {formState.errors?.email?.message as string}
              </small>
            </div>

            <div className="flex flex-col">
              <label htmlFor="password" className="font-medium text-sm mb-1">
                Password
              </label>
              <input
                type="password"
                disabled={isLoading}
                {...register('password', {
                  required: 'Password field is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters long',
                  },
                  pattern: {
                    value: strongPasswordRegex,
                    message:
                      'Must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
                  },
                })}
                name="password"
                autoComplete="new-password"
                className="outline-none border border-stone-600 rounded-[4px] focus:border-[#f8982d] focus:border-2 text-sm w-full py-4 px-3"
              />
              <small className="text-red-500 text-[13px]">
                {formState.errors?.password?.message as string}
              </small>
            </div>
            <button
              type="submit"
              className="bg-[#f8982d]   my-5  transform duration-300 ease-in-out text-white font-semibold text-[14px] rounded-[3px] w-full mt-5 py-3 shadow-sm"
            >
              {isLoading ? 'Processing..' : 'Sign Up'}
            </button>
          </form>

          <div className="font-semibold text-sm my-3 text-center">
            Have an account?
            <Link
              to={'/auth/login'}
              className="font-semibold text-[#f8982d] cursor-pointer ml-1"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
