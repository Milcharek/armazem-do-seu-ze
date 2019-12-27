import styled from 'styled-components';
import { darken } from 'polished';

export const Button = styled.button`
  background: #0262cc;
  color: #fff;
  border: 0;
  border-radius: 4px;
  padding: 12px 20px;
  font-weight: bold;
  text-transform: uppercase;
  transition: background 0.2s;
  margin-top: 10px;

  &:hover {
    background: ${darken(0.05, '#0262CC')};
  }
`;

export const Title = styled.h1`
  font-size: 20px;
`;

export const Content = styled.p`
  margin-top: 10px;
`;
