import React, { useEffect } from 'react';
import { Modal, Form, Input, notification } from 'antd';
import { useCreateUser, useUpdateUser, User } from '@entities/user';

interface UserModalProps {
  open: boolean;
  user: User | null;
  onClose: () => void;
}

const URL_PATTERN = /^https?:\/\/.+/;

export const UserModal: React.FC<UserModalProps> = ({ open, user, onClose }) => {
  const [form] = Form.useForm();
  const createUser = useCreateUser();
  const updateUser = useUpdateUser();

  const isEdit = !!user;
  const isLoading = createUser.isLoading || updateUser.isLoading;

  useEffect(() => {
    if (open && user) {
      form.setFieldsValue(user);
    } else if (open) {
      form.resetFields();
    }
  }, [open, user, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      if (isEdit && user) {
        updateUser.mutate(
          { id: user.id, ...values },
          {
            onSuccess: () => {
              notification.success({
                message: 'Успешно',
                description: 'Пользователь обновлен',
              });
              onClose();
            },
            onError: (error: Error) => {
              notification.error({
                message: 'Ошибка',
                description: error.message,
              });
            },
          }
        );
      } else {
        createUser.mutate(values, {
          onSuccess: () => {
            notification.success({
              message: 'Успешно',
              description: 'Пользователь создан',
            });
            onClose();
          },
          onError: (error: Error) => {
            notification.error({
              message: 'Ошибка',
              description: error.message,
            });
          },
        });
      }
    } catch (error) {
      return;
    }
  };

  return (
    <Modal
      title={isEdit ? 'Редактировать пользователя' : 'Создать пользователя'}
      open={open}
      onOk={handleSubmit}
      onCancel={onClose}
      okText={isEdit ? 'Сохранить' : 'Создать'}
      cancelText="Отмена"
      confirmLoading={isLoading}
      closable={!isLoading}
      maskClosable={!isLoading}
      keyboard={!isLoading}
      cancelButtonProps={{ disabled: isLoading }}
    >
      <Form form={form} layout="vertical">
        {isEdit && (
          <Form.Item label="ID" name="id">
            <Input disabled />
          </Form.Item>
        )}
        <Form.Item
          label="Имя"
          name="name"
          rules={[{ required: true, message: 'Введите имя' }]}
        >
          <Input placeholder="Введите имя" disabled={isLoading} />
        </Form.Item>
        <Form.Item
          label="Аватар"
          name="avatar"
          rules={[
            { required: true, message: 'Введите URL аватара' },
            { pattern: URL_PATTERN, message: 'Введите корректный URL' },
          ]}
        >
          <Input placeholder="https://example.com/avatar.jpg" disabled={isLoading} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
