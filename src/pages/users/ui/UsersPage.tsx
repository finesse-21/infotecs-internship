import React from 'react';
import { Button, Table, Avatar } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { useUsers, User } from '@entities/user';
import { removeToken } from '@shared/lib/auth';
import { ROUTES } from '@shared/config/routes';

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

export const UsersPage: React.FC = () => {
  const navigate = useNavigate();
  const { data: users = [], isLoading } = useUsers();

  const handleLogout = () => {
    removeToken();
    navigate(ROUTES.LOGIN);
  };

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
      ),) => <Avatar src={avatar} size={48} />,
    },
    {
      title: 'Имя',
      dataIndex: 'name',
      key: 'name'     icon={<PlusOutlined />}
            onClick={handleCreateUser}
          >
            Создать пользователя
          </Button>
          <Button icon={<LogoutOutlined />} onClick={handleLogout}>
            Выход
          </Button>
        </Space>
      </HButton icon={<LogoutOutlined />} onClick={handleLogout}>
          Выход
        </Button={handleCloseModal}
      />
    </Container>
  );
};
