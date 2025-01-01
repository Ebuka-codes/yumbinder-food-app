import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const recipeCategory: string[] = [
    'vegetarian',
    'seafood',
    'beef',
    'pasta',
    'chicken',
  ];
  return (
    <footer className="bg-black lg:px-20 px-6 w-full py-10 text-white">
      <section className="lg:flex gap-40 ">
        <div className="lg:w-[55%] w-full">
          <h1 className="font-semibold text-[16px] text-white">About Us</h1>
          <p className="text-[15px] font-light tracking-[.01em] lg:leading-[2] leading-[1.6] text-white mt-2">
            Are you ready to elevate your cooking game and discover a world of
            delicious possibilities? At Yumbinder, we're passionate about
            bringing you the best recipes, tips, and tricks to make cooking at
            home not just easy, but fun and exciting! Whether you're a seasoned
            chef or just starting out, our app offers something for everyone.
          </p>
        </div>
        <div className="sm:flex gap-20 mt-10 lg:mt-0">
          <div>
            <div>
              <h1 className=" font-semibold text-[16px] text-white">
                Learn More
              </h1>
              <ul className="text-sm space-y-3 mt-3 ">
                <li className="hover:text-[#FF550C] duration-300 ease-in-out">
                  <Link to="/about">About</Link>
                </li>
                <li className="hover:text-[#FF550C] duration-300 ease-in-out">
                  <Link to="/contact">Contact</Link>
                </li>
                <li className="hover:text-[#FF550C] duration-300 ease-in-out">
                  <Link to="/blog">Blog</Link>
                </li>
              </ul>
            </div>
            <div className="mt-10 md:mt-4">
              <h1 className=" font-semibold text-[16px] text-white">Shop</h1>
              <ul className="text-sm space-y-3 mt-3">
                <li>Gift Subscription</li>
                <li>Merchandise</li>
                <li>Send Us Feedback</li>
              </ul>
            </div>
          </div>

          <div>
            <h1 className="font-semibold text-[16px] text-white mt-10 sm:mt-0">
              Recipes
            </h1>
            <ul className="space-y-5 mt-2">
              {recipeCategory.map((recipes, index) => (
                <li
                  className="text-sm  font-normal capitalize hover:text-[#FF550C] duration-300 ease-in-out"
                  key={index}
                >
                  <Link to={`/recipes/${recipes}`}> {recipes}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <p className=" text-[12px] text-white mt-7 lg:mt-0">
        Copyright &copy; 2022 Yumbinder. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
