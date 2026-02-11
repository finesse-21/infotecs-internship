import React from 'react';
import { Spin } from 'antd';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  width: 100%;
`;

export const LoadingSpinner: React.FC = () => {
  return (
    <Container>
      <Spin size="large" />
    </Container>
  );
};
