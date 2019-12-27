import styled from 'styled-components';
import { Link } from 'react-router-dom';

/* Estilização geral do header */
export const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 50px;
  /* Tamanho da logo */
  img {
    height: 70px;
  }
`;

/* Estilização do carrinho de compras do header */
export const Cart = styled(Link)`
  display: flex;
  position: relative;
  align-items: center;
  text-decoration: none;
  transition: opacity 0.2s;
  /* Efeito ao passar o mouse pelo carrinho */
  &:hover {
    opacity: 0.7;
  }
  /* Estilização da badge que exibe a quantidade de itens do carrinho */
  span {
    position: absolute;
    top: -5px;
    right: 0;
    font-size: 12px;
    color: #fff;
    background-color: #0262cc;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    /* Centraliza a quantidade de itens do carrinho */
    text-align: center;
    padding: 3px;
`;
