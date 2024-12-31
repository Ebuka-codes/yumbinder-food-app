import axios from 'axios';
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { db } from './firebase';
import { RecipeType } from '../type';
export interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  time: number;
}
export interface MealResponse {
  meals: Meal[] | null;
}
export const getFoodData = async (url: string): Promise<Meal[]> => {
  const { data } = await axios.get<MealResponse>(url);
  return data.meals || [];
};

export const getRecipeByName = async (url: string): Promise<Meal[]> => {
  const { data } = await axios.get<MealResponse>(url);
  return data.meals || [];
};

export const savedRecipes = async (recipe: RecipeType) => {
  try {
    const docRef = await addDoc(collection(db, 'savedRecipe'), {
      ...recipe,
      createdBy: recipe.userid,
      createdAt: new Date(),
    });
    console.log('Recipe saved with ID:', docRef.id);
  } catch (error) {
    console.error('Error saving recipe:', error);
  }
};

export const getSavedRecipe = async (userid: string) => {
  const recipesRef = collection(db, 'savedRecipe');
  const q = query(recipesRef, where('createdBy', '==', userid));
  try {
    const querySnapshot = await getDocs(q);
    const recipes = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }));

    return recipes;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return [];
  }
};
export const deleteSaveRecipe = async (recipeId: string) => {
  try {
    await deleteDoc(doc(db, 'savedRecipe', recipeId));
    console.log('Document successfully deleted!');
  } catch (error: any) {
    throw new Error(error.message);
  }
};
