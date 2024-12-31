import { useMutation } from '@tanstack/react-query';
import { resetPassword } from '../../service/auth';
import toast from 'react-hot-toast';

export const useResetPassword = () => {
  const { mutate: reset, isPending: isReseting } = useMutation({
    mutationKey: ['resetPassword'],
    mutationFn: (email: string) => resetPassword(email),
    onSuccess() {
      toast.success(
        'Password reset email sent successfully. Check your inbox.'
      );
    },
    onError() {
      toast.error('Error resetting password');
    },
  });
  return { reset, isReseting };
};
