import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorMessage } from '../ErrorMessage';

describe('ErrorMessage', () => {
  it('should render error message with default text', () => {
    render(<ErrorMessage />);
    expect(screen.getByText('Ошибка')).toBeInTheDocument();
    expect(screen.getByText('Не удалось загрузить данные')).toBeInTheDocument();
  });

  it('should render custom error message', () => {
    render(<ErrorMessage message="Custom error" />);
    expect(screen.getByText('Custom error')).toBeInTheDocument();
  });

  it('should render retry button when onRetry is provided', () => {
    const onRetry = jest.fn();
    render(<ErrorMessage onRetry={onRetry} />);
    const button = screen.getByRole('button', { name: /попробовать снова/i });
    expect(button).toBeInTheDocument();
  });

  it('should call onRetry when button is clicked', () => {
    const onRetry = jest.fn();
    render(<ErrorMessage onRetry={onRetry} />);
    const button = screen.getByRole('button', { name: /попробовать снова/i });
    fireEvent.click(button);
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it('should not render retry button when onRetry is not provided', () => {
    render(<ErrorMessage />);
    const button = screen.queryByRole('button', { name: /попробовать снова/i });
    expect(button).not.toBeInTheDocument();
  });
});
