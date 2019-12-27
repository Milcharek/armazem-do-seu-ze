// Action de requisição de adição ao carrinho
export function addToCartRequest(id) {
  return {
    type: '@cart/ADD_REQUEST',
    id,
  };
}

// Action de sucesso da requisição ao adicionar ao carrinho
export function addToCartSuccess(product) {
  return {
    type: '@cart/ADD_SUCCESS',
    product,
  };
}

// Action de remoção de um produto do carrinho
export function removeFromCart(id) {
  return {
    type: '@cart/REMOVE',
    id,
  };
}

// Action que zera o carrinho
export function clearCart() {
  return {
    type: '@cart/CLEAR',
  };
}

// Action de requisição de atualização da quantidade de um produto
export function updateAmountRequest(id, amount) {
  return {
    type: '@cart/UPDATE_AMOUNT_REQUEST',
    id,
    amount,
  };
}

// Action de sucesso da requisição de atualização da quantidade de um produto
export function updateAmountSuccess(id, amount) {
  return {
    type: '@cart/UPDATE_AMOUNT_SUCCESS',
    id,
    amount,
  };
}
