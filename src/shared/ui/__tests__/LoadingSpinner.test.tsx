import React from 'react';
import { render, screen } from '@testing-library/react';
import { LoadingSpinner } from '../LoadingSpinner';

describe('LoadingSpinner', () => {
  it('should render loading spinner', () => {
    const { container } = render(<LoadingSpinner />);
    const spinner = container.querySelector('.ant-spin');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('ant-spin-spinning');
  });

  it('should render large size spinner', () => {
    const { container } = render(<LoadingSpinner />);
    const spinner = container.querySelector('.ant-spin-lg');
    expect(spinner).toBeInTheDocument();
  });
});
