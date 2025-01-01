import React, { useEffect } from 'react';
const Blog = () => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);
  return (
    <section className="mt-10">
      <header className="bg-slate-50  px-20 py-10 w-full">
        <h1 className="text-center text-[22px] lg:text-[2.4rem] font-bold">
          Our Blog
        </h1>
      </header>
      <div className="lg:mt-20 mt-10 grid  grid-cols-1 md:grid-cols-2   xl:grid-cols-3 gap-5 w-[85%] mx-auto mb-20">
        <div className="bg-white shadow-md rounded-md">
          <img
            src="/image/download (2).jpeg"
            alt=""
            className="w-full object-cover  h-[200px] rounded-md"
          />
          <h2 className="mt-5 leading-10 ml-5 text-[1rem] font-bold">
            Healthy Avocado Toast with a Twist
          </h2>
          <p className="px-3 pb-3">
            Give your classic avocado toast a delicious upgrade with this
            healthy recipe. Packed with flavor and nutrients, it’s the perfect
            breakfast or light lunch
          </p>
        </div>
        <div className="bg-white shadow-md rounded-md">
          <img
            src="/image/download (3).jpeg"
            alt=""
            className="w-full object-cover h-[200px] rounded-md"
          />
          <h2 className="mt-5  text-[1rem]  ml-5  leading-10 font-bold">
            Homemade Margherita Pizza
          </h2>
          <p className="px-3 pb-3">
            Craving pizza? Try this homemade Margherita pizza recipe, with a
            crispy crust, fresh basil, and gooey mozzarella. Perfect for pizza
            lovers of all ages
          </p>
        </div>
        <div className="bg-white shadow-md rounded-md">
          <img
            src="/image/download (4).jpeg"
            alt=""
            className="w-full object-cover rounded-md h-[200px]"
          />
          <h2 className="mt-5  text-[1rem]  ml-5  leading-10 font-bold">
            Spicy Chicken Tacos
          </h2>
          <p className="px-3 pb-3">
            Turn up the heat with these spicy chicken tacos! Flavor-packed and
            easy to make, these tacos are sure to spice up your next taco night
          </p>
        </div>
      </div>
    </section>
  );
};

export default Blog;
