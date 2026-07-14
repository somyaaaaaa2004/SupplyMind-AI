'use client';

import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/store/auth.store';
import { authService } from '@/services/auth.service';

export function useCurrentUser() {
  const { isAuthenticated, updateUser } = useAuthStore();

  const query = useQuery({
    queryKey: ['auth', 'me'],
    queryFn: async () => {
      const response = await authService.getMe();
      updateUser(response.data);
      return response.data;
    },
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });

  return query;
}
