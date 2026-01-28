import { useMutation } from '@tanstack/react-query';
import { authApi, LoginRequest } from '@/app/lib/api/auth';
import { getToken } from '@/app/lib/api-client';

export const useAuth = () => {
  const loginMutation = useMutation({
    mutationFn: (data: LoginRequest) => authApi.login(data),
  });

  return {
    isAuthenticated: !!getToken(),
    isLoading: loginMutation.isPending,
    login: (email: string, password: string) => 
      loginMutation.mutateAsync({ email, password }),
  };
};

