import { useMutation } from '@tanstack/react-query';
import { deleteSaveRecipe } from '../../service/recipeApi';
import toast from 'react-hot-toast';

export const useDeleteSavedRecipe = () => {
  const { mutate: deleteRecipe, isPending: isDeleting } = useMutation({
    mutationKey: ['deleteRecipe'],
    mutationFn: (recipeId: string) => deleteSaveRecipe(recipeId),
    onSuccess: (data) => {
      toast.success('Recipe deleted successfully');
    },
  });
  return { deleteRecipe, isDeleting };
};
