import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const Contact = () => {
  const { handleSubmit, register, formState, reset } = useForm();
  const { errors } = formState;
  const onsubmit = (data: any) => {
    if (data) {
      toast.success('Informations sent successfully!👍');
      reset();
    }
  };
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);
  return (
    <section className="mt-10">
      <header className="bg-slate-50  px-20 py-10 w-full">
        <h1 className="text-center  text-[22px] lg:text-[2.4rem] font-bold">
          Contact Us
        </h1>
      </header>
      <div className="mb-10 contact-container">
        <form
          onSubmit={handleSubmit(onsubmit)}
          className="bg-white border border-stone-200 lg:ml-20 rounded-md  mt-10 lg:mt-20 py-5 px-10 lg:w-[85%] w-[85%] space-y-3l;"
        >
          <div className="flex flex-col">
            <label htmlFor="email" className="font-medium">
              Email Address
            </label>
            <input
              type="email"
              {...register('email', { required: 'Email is required' })}
              className="border border-stone-300 rounded-md py-2  mt-2 px-3 outline-none focus:border-[#FF550C]"
            />
            <small className="text-[16px] text-red-500 py-2">
              {errors?.email?.message as string}
            </small>
          </div>
          <div className="flex flex-col">
            <label htmlFor="name" className="font-medium">
              How can we help you?
            </label>
            <input
              type="text"
              {...register('help', {
                required: 'How can we help you is required',
              })}
              className="border border-stone-300 rounded-md py-2 px-3 mt-2 outline-none focus:border-[#FF550C]"
            />
            <small className="text-[16px] text-red-500 py-2">
              {errors?.help?.message as string}
            </small>
          </div>
          <div className="flex flex-col">
            <label htmlFor="message" className="font-medium">
              Message
            </label>
            <textarea
              {...register('message', {
                required: 'Message is required',
              })}
              className="border border-stone-300 rounded-md py-2 px-3 mt-2 outline-none h-[130px] focus:border-[#FF550C]"
            />
            <small className="text-[16px] text-red-500 py-2">
              {errors?.message?.message as string}
            </small>
          </div>
          <button
            type="submit"
            className="bg-[#FF550C] text-white font-semibold p-3 my-2 rounded-md mt-5"
          >
            Send Message
          </button>
        </form>
        <div className="hidden lg:block">
          <img src="image/contact_us.webp" alt="" />
        </div>
      </div>
    </section>
  );
};

export default Contact;
