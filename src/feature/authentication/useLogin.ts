import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { UserType } from '../../type';
import { loginUser } from '../../service/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    mutate: login,
    error,
    isPending: isLoading,
  } = useMutation({
    mutationKey: ['user'],
    mutationFn: ({ email, password }: UserType) => loginUser(email, password),
    onSuccess: (user: any) => {
      toast.success('Login successfully');
      queryClient.setQueryData(['user'], user);
      navigate('/', { replace: true });
    },
    onError: (error: Error) => {
      if (error.message === 'Firebase: Error (auth/network-request-failed).') {
        toast.error('No internet connection');
      }
      if (error.message === 'Firebase: Error (auth/invalid-credential)')
        toast.error('User error');
    },
  });
  return { login, error, isLoading };
};
