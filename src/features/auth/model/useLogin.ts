import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface LoginCredentials {
  login: string;
  password: string;
}

const ADMIN_LOGIN = 'admin';
const ADMIN_PASSWORD = 'admin';

const loginRequest = async (credentials: LoginCredentials): Promise<string> => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        if (credentials.login === ADMIN_LOGIN && credentials.password === ADMIN_PASSWORD) {
          await axios.post('https://jsonplaceholder.typicode.com/posts', {
            login: credentials.login,
          });
          resolve('mock_auth_token_12345');
        } else {
          reject(new Error('Неверный логин или пароль'));
        }
      } catch (error) {
        reject(new Error('Неверный логин или пароль'));
      }
    }, 2000);
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: loginRequest,
  });
};
