import React from 'react';
import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@shared/config/routes';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Result
      status="404"
      title="404"
      subTitle="Извините, страница не найдена"
      extra={
        <Button type="primary" onClick={() => navigate(ROUTES.USERS)}>
          На главную
        </Button>
      }
    />
  );
};
