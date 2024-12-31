import { useMutation } from '@tanstack/react-query';
import { signUpUser } from '../../service/auth';
import { UserType } from '../../type';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const useSignUp = () => {
  const navigate = useNavigate();
  const { mutate: signUser, isPending: isLoading } = useMutation({
    mutationKey: ['signupUser'],
    mutationFn: ({ email, password }: UserType) => signUpUser(email, password),
    onSuccess(user) {
      toast.success('User created');
      navigate('/auth/login', { replace: true });
    },
    onError(error: Error) {
      if (error.message === 'Firebase: Error (auth/network-request-failed).') {
        toast.error('No internet connection');
      }
      if (error.message === 'Firebase: Error (auth/invalid-credential).') {
        toast.error('Invalid credentials try again');
      }
    },
  });
  return { signUser, isLoading };
};
