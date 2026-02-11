import { apiInstance } from '@shared/api/instance';
import { User } from '../model/types';

export const userApi = {
  getAll: async (): Promise<User[]> => {
    const { data } = await apiInstance.get<User[]>('/users');
    return data;
  },

  create: async (user: Omit<User, 'id' | 'createdAt'>): Promise<User> => {
    const { data } = await apiInstance.post<User>('/users', user);
    return data;
  },

  update: async (id: string, user: Omit<User, 'createdAt'>): Promise<User> => {
    const { data } = await apiInstance.put<User>(`/users/${id}`, user);
    return data;
  },
};
