import React from 'react';

import { View, StyleSheet } from 'react-native';
import Header from './components/Header';
import Main from './pages/Main';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191920',
  },
});

export default function App() {
  return (
    <View style={styles.container}>
      <Header />
      <Main />
    </View>
  );
}
