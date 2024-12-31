import { SetStateAction } from 'react';

export type UserType = {
  email: string;
  password: string;
};
// Define the Recipe type
export type RecipeType = {
  id: string;
  title: string;
  category: string;
  area: string;
  instructions: string;
  image: string;
  userid: string;
};
export type savedRecipeType = {
  setSaveRecipe: React.Dispatch<SetStateAction<boolean>>;
};
