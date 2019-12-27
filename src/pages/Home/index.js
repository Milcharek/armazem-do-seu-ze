import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MdShoppingCart } from 'react-icons/md';
import { ProductList, Select } from './styles';
import { formatPrice } from '../../util/format';
import api from '../../services/api';
import * as CartActions from '../../store/modules/cart/actions';

class Home extends Component {
  state = {
    products: [],
    categories: [],
    selectedCategory: null,
  };

  // Invoca as funções fetchProducts e fetchCategories quando o componente é montado
  componentDidMount() {
    this.fetchProducts();
    this.fetchCategories();
  }

  // Busca os produtos da API
  fetchProducts = async () => {
    const response = await api.get('products');

    const data = response.data.map(product => ({
      ...product,
      priceFormatted: formatPrice(product.price),
    }));

    this.setState({ products: data });
  };

  // Busca as categorias da API
  fetchCategories = async () => {
    const response = await api.get('category');

    const { data } = response;

    this.setState({ categories: data });
  };

  // Adiciona um produto ao carrinho
  handleAddProduct = id => {
    const { addToCartRequest } = this.props;

    addToCartRequest(id);
  };

  // Atualiza categoria selecionada ao mudar o select
  handleOnChangeCategory = event => {
    this.setState({ selectedCategory: event.target.value });
  };

  render() {
    const { products, categories, selectedCategory } = this.state;
    const { amount } = this.props;
    /* Caso haja alguma categoria selecionada,
     * filtra a lista de produtos de acordo com a categoria */
    const filteredProducts = selectedCategory
      ? products.filter(product => product.category == selectedCategory)
      : products;

    return (
      <>
        {/* Select com as categorias de produtos disponíveis */}
        <Select value={selectedCategory} onChange={this.handleOnChangeCategory}>
          <option value="">Selecione a categoria</option>
          {categories.map(category => (
            <option value={category.id} key={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
        {/* Listagem de produtos */}
        <ProductList>
          {filteredProducts.map(product => (
            <li key={product.id}>
              <img src={product.image} alt={product.title} />
              <strong>{product.title}</strong>
              <span>{product.priceFormatted} </span>

              <button
                type="button"
                onClick={() => this.handleAddProduct(product.id)}
              >
                <div>
                  <MdShoppingCart size={16} color="#FFF" />{' '}
                  {amount[product.id] || 0}
                </div>

                <span>ADICIONAR AO CARRINHO</span>
              </button>
            </li>
          ))}
        </ProductList>
      </>
    );
  }
}

// Mapeia o state do Redux como props, retornando a quantidade de produtos
const mapStateToProps = state => ({
  amount: state.cart.reduce((amount, product) => {
    amount[product.id] = product.amount;

    return amount;
  }, {}),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
