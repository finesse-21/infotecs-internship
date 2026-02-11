import { useMutation } from '@tanstack/react-query';

interface LoginCredentials {
  login: string;
  password: string;
}

const ADMIN_LOGIN = 'admin';
const ADMIN_PASSWORD = 'admin';

const loginRequest = (credentials: LoginCredentials): Promise<string> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (credentials.login === ADMIN_LOGIN && credentials.password === ADMIN_PASSWORD) {
        resolve('mock_auth_token_12345');
      } else {
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
