import React, { Component } from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  Product,
  ProductImage,
  ProductTitle,
  ProductPrice,
  AddToCartButton,
  ProductAmount,
  ProductAmountValue,
  AddToCartButtonText,
} from './styles';

import api from '../../services/api';

import { formatPrice } from '../../util/format';

export default class Main extends Component {
  state = {
    // eslint-disable-next-line react/no-unused-state
    products: [],
  };

  componentDidMount() {
    this.getProducts();
  }

  getProducts = async () => {
    const response = await api.get('/products');

    // eslint-disable-next-line arrow-parens
    const data = response.data.map(product => ({
      ...product,
      priceFormatted: formatPrice(product.price),
    }));

    // eslint-disable-next-line react/no-unused-state
    this.setState({ products: data });
  };

  // renderItem = ({ item }) => {};

  render() {
    return (
      <Container>
        <Product>
          <ProductImage />
          <ProductTitle>Tênis</ProductTitle>
          <ProductPrice>R$179,90</ProductPrice>
          <AddToCartButton>
            <ProductAmount>
              <Icon name="add-shopping-cart" size={18} color="#fff" />
              <ProductAmountValue> 0 </ProductAmountValue>
            </ProductAmount>
            <AddToCartButtonText>ADICIONAR</AddToCartButtonText>
          </AddToCartButton>
        </Product>

        <Product>
          <ProductImage />
          <ProductTitle>Tênis</ProductTitle>
          <ProductPrice>R$179,90</ProductPrice>
          <AddToCartButton>
            <ProductAmount>
              <Icon name="add-shopping-cart" size={18} color="#fff" />
              <ProductAmountValue> 0 </ProductAmountValue>
            </ProductAmount>
            <AddToCartButtonText>ADICIONAR</AddToCartButtonText>
          </AddToCartButton>
        </Product>

        <Product>
          <ProductImage />
          <ProductTitle>Tênis</ProductTitle>
          <ProductPrice>R$179,90</ProductPrice>
          <AddToCartButton>
            <ProductAmount>
              <Icon name="add-shopping-cart" size={18} color="#fff" />
              <ProductAmountValue> 0 </ProductAmountValue>
            </ProductAmount>
            <AddToCartButtonText>ADICIONAR</AddToCartButtonText>
          </AddToCartButton>
        </Product>
      </Container>
    );
  }
}
