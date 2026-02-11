import { getToken, setToken, removeToken, isAuthenticated } from '../auth';

describe('auth utilities', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('setToken', () => {
    it('should save token to localStorage', () => {
      setToken('test_token');
      expect(localStorage.getItem('auth_token')).toBe('test_token');
    });
  });

  describe('getToken', () => {
    it('should return token from localStorage', () => {
      localStorage.setItem('auth_token', 'test_token');
      expect(getToken()).toBe('test_token');
    });

    it('should return null if token does not exist', () => {
      expect(getToken()).toBeNull();
    });
  });

  describe('removeToken', () => {
    it('should remove token from localStorage', () => {
      localStorage.setItem('auth_token', 'test_token');
      removeToken();
      expect(localStorage.getItem('auth_token')).toBeNull();
    });
  });

  describe('isAuthenticated', () => {
    it('should return true if token exists', () => {
      localStorage.setItem('auth_token', 'test_token');
      expect(isAuthenticated()).toBe(true);
    });

    it('should return false if token does not exist', () => {
      expect(isAuthenticated()).toBe(false);
    });
  });
});
