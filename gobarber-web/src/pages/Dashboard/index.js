import React from 'react';
import api from '~/services/api';

// import { Container } from './styles';

api.get('appointments');

export default function Dashboard() {
  return <h1>Dashboard</h1>;
}
