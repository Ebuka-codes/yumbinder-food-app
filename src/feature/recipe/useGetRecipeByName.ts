import { useQuery } from '@tanstack/react-query';
import { getRecipeByName } from '../../service/recipeApi';

export const useGetRecipeByName = (url: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['query'],
    queryFn: () => getRecipeByName(url),
  });
  return { data, isLoading, isError };
};
