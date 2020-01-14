import React from 'react';
import { StatusBar } from 'react-native';

import Header from './components/Header';

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <Header />
    </>
  );
}
