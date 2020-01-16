import React from 'react';

import {
  Wrapper,
  Container,
  Product,
  ProductImage,
  ProductInfo,
  ProductTitle,
  ProductPrice,
  ProductAbout,
  ProductAmount,
  ProductTotal,
  Total,
  PriceTotal,
  ButtonFinished,
} from './styles';

export default function Cart() {
  return (
    <Wrapper>
      <Container>
        <Product>
          <ProductImage />
          <ProductInfo>
            <ProductTitle>Tênis de caminhada</ProductTitle>
            <ProductPrice>R$189,90</ProductPrice>
          </ProductInfo>
        </Product>
        <ProductAbout>
          <ProductAmount>3</ProductAmount>
          <ProductTotal>R$578,90</ProductTotal>
        </ProductAbout>
        <Total />
        <PriceTotal />
        <ButtonFinished />
      </Container>
    </Wrapper>
  );
}
