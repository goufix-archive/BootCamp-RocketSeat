import React from 'react';
import { FlatList } from 'react-native';

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

export default function Main() {
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
