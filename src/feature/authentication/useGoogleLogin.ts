import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { googleLogin } from '../../service/auth';

export const useGoogleLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    mutate: loginWithGoogle,
    error,
    isPending: isLoading,
  } = useMutation({
    mutationKey: ['user'],
    mutationFn: googleLogin,
    onSuccess: (user: any) => {
      console.log(user);
      toast.success('User created');
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
  return { loginWithGoogle, error, isLoading };
};
