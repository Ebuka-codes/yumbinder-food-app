import { useQuery } from '@tanstack/react-query';
import { getSavedRecipe } from '../../service/recipeApi';
import { useGetUser } from '../authentication/useGetUser';
export const useGetSavedRecipe = () => {
  const { user } = useGetUser();
  const { data, isLoading } = useQuery({
    queryKey: ['savedRecipe'],
    queryFn: () => getSavedRecipe(user?.uid as string),
  });
  return { data, isLoading };
};
