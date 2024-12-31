import { useQuery } from '@tanstack/react-query';
import { getFoodData } from '../service/recipeApi';
export const useFoodData = () => {
  const beefQuery = useQuery({
    queryKey: ['beef'],
    queryFn: () =>
      getFoodData('https://www.themealdb.com/api/json/v1/1/search.php?s=Beef'),
  });

  const seafoodQuery = useQuery({
    queryKey: ['seafood'],
    queryFn: () =>
      getFoodData(
        'https://www.themealdb.com/api/json/v1/1/search.php?s=Seafood'
      ),
  });

  const chickenQuery = useQuery({
    queryKey: ['chicken'],
    queryFn: () =>
      getFoodData(
        'https://www.themealdb.com/api/json/v1/1/search.php?s=chicken'
      ),
  });

  const dessertQuery = useQuery({
    queryKey: ['dessert'],
    queryFn: () =>
      getFoodData(
        'https://www.themealdb.com/api/json/v1/1/search.php?s=dessert'
      ),
  });

  const pastaQuery = useQuery({
    queryKey: ['pasta'],
    queryFn: () =>
      getFoodData('https://www.themealdb.com/api/json/v1/1/search.php?s=pasta'),
  });

  const vegetarianQuery = useQuery({
    queryKey: ['vegetarian'],
    queryFn: () =>
      getFoodData(
        'https://www.themealdb.com/api/json/v1/1/search.php?s=vegetarian'
      ),
  });

  return {
    beefQuery,
    chickenQuery,
    pastaQuery,
    vegetarianQuery,
    dessertQuery,
    seafoodQuery,
  };
};
