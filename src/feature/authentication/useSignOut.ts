import { useMutation, useQueryClient } from '@tanstack/react-query';
import { handleSignOut } from '../../service/auth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
export const useSignOut = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: signOut, isPending: isLoading } = useMutation({
    mutationKey: ['logout'],
    mutationFn: handleSignOut,
    onSuccess() {
      navigate('/auth/login', { replace: true });
      toast.success('Logged out successfully');
      queryClient.setQueryData(['logout'], null);
    },
    onError(error: Error) {
      if (error.message === 'Firebase: Error (auth/network-request-failed).') {
        toast.error('No internet connection');
      } else {
        toast.error(error.message);
      }
    },
  });
  return { signOut, isLoading };
};
