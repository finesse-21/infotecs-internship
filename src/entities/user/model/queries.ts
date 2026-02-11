import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userApi } from '../api/userApi';
import { User } from '../model/types';

export const USER_QUERY_KEY = 'users';

export const useUsers = () => {
  return useQuery({
    queryKey: [USER_QUERY_KEY],
    queryFn: userApi.getAll,
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (user: Omit<User, 'id' | 'createdAt'>) => userApi.create(user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEY] });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (user: Omit<User, 'createdAt'>) => userApi.update(user.id, user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEY] });
    },
  });
};
