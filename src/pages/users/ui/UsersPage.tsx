import React, { useState } from 'react';
import { Button, Space, Table, Avatar } from 'antd';
import { PlusOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { useUsers, User } from '@entities/user';
import { removeToken } from '@shared/lib/auth';
import { ROUTES } from '@shared/config/routes';
import { UserModal } from '@widgets/user-modal';
import { ErrorMessage } from '@shared/ui/ErrorMessage';
import { LoadingSpinner } from '@shared/ui/LoadingSpinner';

const Container = styled.div`
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const Title = styled.h1`
  margin: 0;
`;

const ClickableText = styled.span`
  cursor: pointer;
  color: #1890ff;
  
  &:hover {
    text-decoration: underline;
  }
`;

export const UsersPage: React.FC = () => {
  const navigate = useNavigate();
  const { data: users = [], isLoading, isError, error, refetch } = useUsers();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleLogout = () => {
    removeToken();
    navigate(ROUTES.LOGIN);
  };

  const handleCreateUser = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    const errorMessage = error instanceof Error ? error.message : 'Не удалось загрузить пользователей';
    return <ErrorMessage message={errorMessage} onRetry={refetch} />;
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: 'Аватар',
      dataIndex: 'avatar',
      key: 'avatar',
      width: 80,
      render: (avatar: string, record: User) => (
        <Avatar
          src={avatar}
          size={48}
          onClick={() => handleEditUser(record)}
          style={{ cursor: 'pointer' }}
        />
      ),
    },
    {
      title: 'Имя',
      dataIndex: 'name',
      key: 'name',
      render: (name: string, record: User) => (
        <ClickableText onClick={() => handleEditUser(record)}>
          {name}
        </ClickableText>
      ),
    },
    {
      title: 'Зарегистрирован',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => dayjs(date).format('DD.MM.YYYY'),
    },
  ];

  return (
    <Container>
      <Header>
        <Title>Пользователи</Title>
        <Space>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleCreateUser}
          >
            Создать пользователя
          </Buttofalse
          <Button icon={<LogoutOutlined />} onClick={handleLogout}>
            Выход
          </Button>
        </Space>
      </Header>
      <Table
        columns={columns}
        dataSource={users}
        loading={isLoading}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
      <UserModal
        open={isModalOpen}
        user={selectedUser}
        onClose={handleCloseModal}
      />
    </Container>
  );
};
