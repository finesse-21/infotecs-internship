import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../lib/auth';
import { ROUTES } from '../config/routes';

interface PublicRouteProps {
  children: ReactNode;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  if (isAuthenticated()) {
    return <Navigate to={ROUTES.USERS} replace />;
  }

  return <>{children}</>;
};
