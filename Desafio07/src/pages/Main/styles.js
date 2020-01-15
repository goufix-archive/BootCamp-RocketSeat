import styled from 'styled-components/native';

import colors from '../../styles/colors';

import tenis from '../../assets/tenis.jpg';

export const Container = styled.View`
  flex-direction: row;
  background: ${colors.dark};
`;
export const Product = styled.View`
  background: #fff;
  padding: 5px;
  margin: 10px;
  border-radius: 6px;
  width: 250px;
`;

export const ProductImage = styled.Image.attrs({
  source: tenis,
})`
  height: 200px;
  width: 200px;
`;

export const ProductTitle = styled.Text`
  font-size: 15px;
  padding: 5px;
`;

export const ProductPrice = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin: 14px 0;
  padding: 5px;
`;

export const AddToCartButton = styled.TouchableOpacity`
  background: ${colors.primary};
  flex-direction: row;
  align-items: center;
  border-radius: 4px;
  margin-top: auto;
`;
export const ProductAmount = styled.View`
  padding: 12px;
  background: ${colors.primary};
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  flex-direction: row;
  align-items: center;
`;
export const ProductAmountValue = styled.Text`
  color: #fff;
  margin: 0 4px 0 5px;
`;

export const AddToCartButtonText = styled.Text`
  flex: 1;
  color: #fff;
  text-align: center;
  font-weight: bold;
`;
