import { call, select, put, all, takeLatest } from 'redux-saga/effects';
import {
  addToCartSuccess,
  updateAmountSuccess,
  removeFromCart,
} from './actions';
import '../../../components/Header/index';
import api from '../../../services/api';
import { formatPrice } from '../../../util/format';

function* addToCart({ id }) {
  // Verifica se o produto existe no carrinho
  const productExists = yield select(state =>
    state.cart.find(p => p.id === id)
  );

  // Caso o produto exista, retorna a quantidade deste produto no carrinho, caso contrário retorna 0
  const currentAmount = productExists ? productExists.amount : 0;

  // Guarda na variável amount o currentAmount mais 1 unidade
  const amount = currentAmount + 1;

  if (productExists) {
    yield put(updateAmountSuccess(id, amount));
  } else {
    const response = yield call(api.get, `/products/${id}`);

    const data = {
      ...response.data,
      amount: 1,
      priceFormatted: formatPrice(response.data.price),
    };

    yield put(addToCartSuccess(data));
  }
}

function* updateAmount({ id, amount }) {
  // Remove o produto do carrinho caso a quantidade deste produto for menor que 1
  if (amount < 1) {
    yield put(removeFromCart(id, amount));
  }

  yield put(updateAmountSuccess(id, amount));
}

export default all([
  takeLatest('@cart/ADD_REQUEST', addToCart),
  takeLatest('@cart/UPDATE_AMOUNT_REQUEST', updateAmount),
]);
