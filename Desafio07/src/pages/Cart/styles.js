import styled from 'styled-components/native';

import tenis from '../../assets/tenis.jpg';

export const Wrapper = styled.SafeAreaView`
  flex: 1;
`;

export const Container = styled.View`
  background: #fff;
  border-radius: 4px;
  margin: 0 15px;
  padding: 20px;
`;

export const Product = styled.View`
  flex-direction: row;
`;

export const ProductImage = styled.Image.attrs({
  source: tenis,
})`
  height: 200px;
  width: 200px;
`;

export const ProductInfo = styled.View`
  justify-content: center;
`;

export const ProductTitle = styled.Text`
  font-size: 14px;
`;

export const ProductPrice = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

export const ProductAbout = styled.View`
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  background: #eee;
  padding: 8px;
  border-radius: 4px;
`;

export const ProductAmount = styled.TextInput.attrs({
  readonly: true,
})`
  background: #fff;
  padding: 5px;
  margin: 0 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-width: 52px;
`;

export const ProductTotal = styled.Text`
  margin-right: 5px;
  font-weight: bold;
`;

export const Total = styled.Text``;

export const PriceTotal = styled.View``;

export const ButtonFinished = styled.View``;
