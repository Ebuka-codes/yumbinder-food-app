import React, { useEffect } from 'react';
import Hero from '../feature/components/Hero';
import Recipe from '../feature/components/Recipe';
import { useFoodData } from '../feature/useGetRecipesByCategories';
import { Meal } from '../service/recipeApi';

const HomePage = () => {
  const { beefQuery, seafoodQuery, vegetarianQuery, chickenQuery, pastaQuery } =
    useFoodData();
  const combinedMeals: Meal[] = [
    ...(beefQuery.data || []),
    ...(seafoodQuery.data || []),
    ...(vegetarianQuery.data || []),
    ...(chickenQuery.data || []),
    ...(pastaQuery.data || []),
  ];
  const shuffledMeals = combinedMeals
    .sort(() => 0.5 - Math.random())
    .slice(0, 20);

  useEffect(() => {
    document.title = 'Yumbinder - Simple Recipes Makes You Feel Good';
  });
  return (
    <div>
      <Hero />
      <Recipe recipes={shuffledMeals} />
    </div>
  );
};
export default HomePage;
