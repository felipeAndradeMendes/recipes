import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';

function Recipes() {
  const history = useHistory();
  console.log(history);
  return (
    <Header />
  );
}

export default Recipes;
