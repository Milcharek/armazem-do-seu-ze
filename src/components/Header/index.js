import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { MdShoppingCart } from 'react-icons/md';
import { Container, Cart } from './styles';
import logo from '../../assets/images/logop.png';

function Header({ cartSize }) {
  return (
    <Container>
      <Link to="/">
        <img src={logo} alt="Armazém do Seu Zé" />
      </Link>
      <Cart to="/cart">
        {/* Ícone de carrinho de compras com badge indicando a quantidade
        de itens no carrinho */}
        {cartSize > 0 && <span>{cartSize}</span>}
        <MdShoppingCart size={36} color="#FFF" />
      </Cart>
    </Container>
  );
}

export default connect(state => ({
  cartSize: state.cart.length,
}))(Header);
