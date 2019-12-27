import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from 'react-icons/md';
import { Container, ProductTable, Total } from './styles';
import MyModal from '../../components/Modal/index';
import { formatPrice } from '../../util/format';
import * as CartActions from '../../store/modules/cart/actions';

class Cart extends Component {
  state = {
    isModalOpen: false,
  };

  // Incrementa a quantidade de determinado produto no carrinho em 1 unidade
  increment = product => {
    const { updateAmountRequest } = this.props;
    updateAmountRequest(product.id, product.amount + 1);
  };

  // Decrementa a quantidade de determinado produto no carrinho em 1 unidade
  decrement = product => {
    const { updateAmountRequest } = this.props;
    updateAmountRequest(product.id, product.amount - 1);
  };

  // Seta o state como true, abrindo o modal
  onOpenModal = () => {
    this.setState({ isModalOpen: true });
  };

  render() {
    const { cart, total, removeFromCart, clearCart } = this.props;
    const { isModalOpen } = this.state;

    return (
      <Container>
        <ProductTable>
          <thead>
            <tr>
              <th />
              <th>PRODUTO</th>
              <th>QTD</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {cart.map(product => (
              <tr>
                <td>
                  <img src={product.image} alt={product.title} />
                </td>
                <td>
                  <strong>{product.title}</strong>
                  <span>{product.priceFormatted}</span>
                </td>
                <td>
                  <div>
                    <button
                      type="button"
                      onClick={() => this.decrement(product)}
                    >
                      <MdRemoveCircleOutline size={20} color="#0262CC" />
                    </button>
                    <input type="number" readOnly value={product.amount} />
                    <button
                      type="button"
                      onClick={() => this.increment(product)}
                    >
                      <MdAddCircleOutline size={20} color="#0262CC" />
                    </button>
                  </div>
                </td>
                <td>
                  <strong>{product.subtotal}</strong>
                </td>
                <td>
                  <button
                    type="button"
                    onClick={() => removeFromCart(product.id)}
                  >
                    <MdDelete size={20} color="#0262CC" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </ProductTable>

        <footer>
          <MyModal
            onRequestClose={clearCart}
            isOpen={isModalOpen}
            onOpenModal={this.onOpenModal}
          />
          <Total>
            <span>TOTAL</span>
            <strong>{total}</strong>
          </Total>
        </footer>
      </Container>
    );
  }
}

// Mapeia o state do Redux como props e calcula o total e subtotal
const mapStateToProps = state => ({
  cart: state.cart.map(product => ({
    ...product,
    subtotal: formatPrice(product.price * product.amount),
  })),
  total: formatPrice(
    state.cart.reduce((total, product) => {
      return total + product.price * product.amount;
    }, 0)
  ),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
