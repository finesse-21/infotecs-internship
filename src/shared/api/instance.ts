import axios, { AxiosError } from 'axios';
import { notification } from 'antd';

export const apiInstance = axios.create({
  baseURL: 'https://698cd8cb21a248a27362bff4.mockapi.io',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

apiInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.code === 'ECONNABORTED') {
      notification.error({
        message: 'Ошибка',
        description: 'Превышено время ожидания ответа от сервера',
      });
    } else if (!error.response) {
      notification.error({
        message: 'Ошибка сети',
        description: 'Проверьте подключение к интернету',
      });
    } else if (error.response.status >= 500) {
      notification.error({
        message: 'Ошибка сервера',
        description: 'Попробуйте повторить запрос позже',
      });
    }
    return Promise.reject(error);
  }
);

