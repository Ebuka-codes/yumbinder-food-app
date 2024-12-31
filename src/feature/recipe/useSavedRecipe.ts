import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { savedRecipes } from '../../service/recipeApi';
import { RecipeType } from '../../type';

export const useSavedRecipe = () => {
  const queryClient = useQueryClient();
  const { mutate: savedRecipe, isPending: isLoading } = useMutation({
    mutationKey: ['saveRecipes'],
    mutationFn: (data: RecipeType) => savedRecipes(data),
    onSuccess: (data) => {
      toast.success('Recipe saved successfully');
      queryClient.setQueryData(['savedRecipes'], data);
    },
    onError: () => toast.error('Failed to save recipe'),
  });
  return { savedRecipe, isLoading };
};
