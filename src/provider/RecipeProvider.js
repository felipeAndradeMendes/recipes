import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import RecipeContext from '../context/RecipeContext';

function RecipeProvider({ children }) {
  const [recipeName, setRecipe] = useState(null);
  const memo = useMemo(() => ({
    recipeName,
    setRecipe,
  }), [recipeName]);
  return (
    <RecipeContext.Provider value={ memo }>
      {children}
    </RecipeContext.Provider>
  );
}

export default RecipeProvider;

RecipeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
