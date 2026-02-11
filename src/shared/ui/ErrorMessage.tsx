import React from 'react';
import { Result, Button } from 'antd';

interface ErrorMessageProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ 
  message = 'Не удалось загрузить данные',
  onRetry 
}) => {
  return (
    <Result
      status="error"
      title="Ошибка"
      subTitle={message}
      extra={
        onRetry && (
          <Button type="primary" onClick={onRetry}>
            Попробовать снова
          </Button>
        )
      }
    />
  );
};
