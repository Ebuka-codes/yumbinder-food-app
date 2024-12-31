import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useSignUp } from './useSignUp';

const SignUp = () => {
  const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const strongPasswordRegex: RegExp =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const { handleSubmit, register, formState, reset } = useForm();
  const { signUser, isLoading } = useSignUp();

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
    document.title = 'Sign up - Foodies';
  });

  return (
    <section>
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
        <h1 className="text-center text-[18px] mt-2">
          Enter your email and password <br /> below create an account.
        </h1>
        <div className="my-5  w-[90%] sm:w-[65%] md:w-[60%] lg:w-[40%]">
          <form
            action=""
            onSubmit={handleSubmit(onsubmit)}
            className="space-y-2"
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
                className="outline-none border border-stone-600 rounded-[4px] text-sm w-full py-3 px-3"
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
                className="outline-none border border-stone-600 rounded-[4px] text-sm w-full py-3 px-3"
              />
              <small className="text-red-500 text-[13px]">
                {formState.errors?.password?.message as string}
              </small>
            </div>
            <button
              type="submit"
              className="bg-[#ff9532] uppercase  my-5 hover:bg-[#fb8f2afb] transform duration-300 ease-in-out text-white font-semibold text-[14px] rounded-[3px] w-full mt-5 py-2"
            >
              {isLoading ? 'Processing..' : 'Sign Up'}
            </button>
          </form>

          <div className="font-semibold text-sm my-3 text-center">
            Have an account?
            <Link
              to={'/auth/login'}
              className="font-semibold text-[#fb8f2afb] cursor-pointer ml-1"
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
