import { renderHook, act } from '@testing-library/react-hooks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useLogin } from '../useLogin';
import React from 'react';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  const Wrapper = ({ children }: { children: React.ReactNode }) => 
    React.createElement(QueryClientProvider, { client: queryClient }, children);
  
  return Wrapper;
};

describe('useLogin', () => {
  it('should successfully login with correct credentials', async () => {
    const { result, waitFor } = renderHook(() => useLogin(), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.mutate({
        login: 'admin',
        password: 'admin',
      });
    });

    await waitFor(() => result.current.isSuccess, { timeout: 3000 });

    expect(result.current.data).toBe('mock_auth_token_12345');
  });

  it('should fail login with incorrect credentials', async () => {
    const { result, waitFor } = renderHook(() => useLogin(), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.mutate({
        login: 'wrong',
        password: 'wrong',
      });
    });

    await waitFor(() => result.current.isError, { timeout: 3000 });

    expect(result.current.error).toBeInstanceOf(Error);
    expect((result.current.error as Error).message).toBe('Неверный логин или пароль');
  });

  it('should have initial idle state', () => {
    const { result } = renderHook(() => useLogin(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isIdle).toBe(true);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isSuccess).toBe(false);
    expect(result.current.isError).toBe(false);
  });
});
