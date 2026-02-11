import React, { useState } from 'react';
import { Form, Input, Button, Card, notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLogin } from '@features/auth';
import { setToken } from '@shared/lib/auth';
import { ROUTES } from '@shared/config/routes';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f0f2f5;
`;

const StyledCard = styled(Card)`
  width: 400px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 24px;
  color: #1890ff;
`;

interface LoginFormValues {
  login: string;
  password: string;
}

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { mutate, isLoading } = useLogin();
  const [form] = Form.useForm();

  const handleSubmit = (values: LoginFormValues) => {
    mutate(values, {
      onSuccess: (token) => {
        setToken(token);
        navigate(ROUTES.USERS);
      },
      onError: (error: Error) => {
        notification.error({
          message: 'Ошибка авторизации',
          description: error.message,
          placement: 'topRight',
        });
      },
    });
  };

  return (
    <Container>
      <StyledCard>
        <Title>Авторизация</Title>
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item
            name="login"
            rules={[{ required: true, message: 'Введите логин' }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Логин"
              disabled={isLoading}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Введите пароль' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Пароль"
              disabled={isLoading}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={isLoading}
              disabled={isLoading}
            >
              Войти
            </Button>
          </Form.Item>
        </Form>
      </StyledCard>
    </Container>
  );
};
