import produce from 'immer';
import history from '../../../services/history';

export default function cart(state = [], action) {
  switch (action.type) {
    // Caso a action @cart/ADD_SUCCESS do cart seja chamada, adiciona o produto ao carrinho
    case '@cart/ADD_SUCCESS':
      return produce(state, draft => {
        const { product } = action;

        draft.push(product);
      });

    // Caso a action @cart/REMOVE do cart seja chamada, remove o produto do carrinho
    case '@cart/REMOVE':
      return produce(state, draft => {
        const productIndex = draft.findIndex(p => p.id === action.id);

        if (productIndex >= 0) {
          draft.splice(productIndex, 1);
        }
        if (draft.length == 0) {
          // Um confirm é aberto ao remover o último produto do carrinho
          const response = window.confirm('Deseja voltar à página inicial?');
          if (response == true) {
            // Caso o usuário dê OK, volta à página inicial
            history.push('/');
          }
        }
      });

    // Caso a action @cart/UPDATE_AMOUNT_SUCCESS do cart seja chamada, atualiza a quantidade de um produto
    case '@cart/UPDATE_AMOUNT_SUCCESS':
      return produce(state, draft => {
        const productIndex = draft.findIndex(p => p.id === action.id);

        if (productIndex >= 0) {
          draft[productIndex].amount = Number(action.amount);
        }
      });

    // Caso a action @cart/CLEAR do cart seja chamada, zera o carrinho e retorna à home
    case '@cart/CLEAR':
      history.push('/');
      return [];

    // Caso nenhuma das condições se aplique, retorna o state padrão
    default:
      return state;
  }
}
