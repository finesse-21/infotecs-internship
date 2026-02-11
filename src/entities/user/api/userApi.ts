import { apiInstance } from '@shared/api/instance';
import { ApiError } from '@shared/api/errors';
import { User } from '../model/types';

export const userApi = {
  getAll: async (): Promise<User[]> => {
    try {
      const { data } = await apiInstance.get<User[]>('/users');
      return data;
    } catch (error) {
      throw new ApiError('Не удалось загрузить список пользователей');
    }
  },

  create: async (user: Omit<User, 'id' | 'createdAt'>): Promise<User> => {
    try {
      const { data } = await apiInstance.post<User>('/users', user);
      return data;
    } catch (error) {
      throw new ApiError('Не удалось создать пользователя');
    }
  },

  update: async (id: string, user: Omit<User, 'createdAt'>): Promise<User> => {
    try {
      const { data } = await apiInstance.put<User>(`/users/${id}`, user);
      return data;
    } catch (error) {
      throw new ApiError('Не удалось обновить пользователя');
    }
  },
};

