import { ApiError, handleApiError } from '../errors';

describe('ApiError', () => {
  it('should create ApiError with message', () => {
    const error = new ApiError('Test error');
    expect(error.message).toBe('Test error');
    expect(error.name).toBe('ApiError');
  });

  it('should create ApiError with status code', () => {
    const error = new ApiError('Test error', 404);
    expect(error.statusCode).toBe(404);
  });

  it('should create ApiError with code', () => {
    const error = new ApiError('Test error', 400, 'BAD_REQUEST');
    expect(error.code).toBe('BAD_REQUEST');
  });
});

describe('handleApiError', () => {
  it('should rethrow ApiError', () => {
    const apiError = new ApiError('API Error', 500);
    expect(() => handleApiError(apiError)).toThrow(ApiError);
    expect(() => handleApiError(apiError)).toThrow('API Error');
  });

  it('should convert Error to ApiError', () => {
    const error = new Error('Regular error');
    expect(() => handleApiError(error)).toThrow(ApiError);
    expect(() => handleApiError(error)).toThrow('Regular error');
  });

  it('should handle unknown errors', () => {
    expect(() => handleApiError('string error')).toThrow(ApiError);
    expect(() => handleApiError('string error')).toThrow(
      'Произошла неизвестная ошибка'
    );
  });

  it('should handle null and undefined', () => {
    expect(() => handleApiError(null)).toThrow('Произошла неизвестная ошибка');
    expect(() => handleApiError(undefined)).toThrow(
      'Произошла неизвестная ошибка'
    );
  });
});
