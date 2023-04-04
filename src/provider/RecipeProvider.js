import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';

function RecipeProvider({ children }) {
  const [recipeName, setRecipe] = useState(null);
  // estado para armazenar o objeto retornado da api
  const [recipeInProgress, setRecipeInProgress] = useState([]);
  // estado para armazenar receita a ser mostrada em progresso
  const [displayRecipeInProgress, setDisplayRecipeInProgress] = useState({
    img: '',
    name: '',
    foodId: '',
    category: '',
    instructions: '',
    ingredients: [],
  });

  const history = useHistory();
  const pathName = history.location.pathname;
  const isDrink = (pathName.includes('/drinks'));

  // Pega os ingredientes do objeto e transforma em array
  const getIngredients = (object) => {
    const arrayOutput = [];
    const maxIngredientsDrinks = 15;
    const maxIngredientsMeals = 20;
    const qtdIngredients = isDrink ? maxIngredientsDrinks : maxIngredientsMeals;
    for (let i = 1; i <= qtdIngredients; i += 1) {
      const ingredientName = (object[`strIngredient${i}`]);
      if (ingredientName) {
        arrayOutput.push(ingredientName);
      }
    }
    return arrayOutput;
  };

  // Pega o objeto retornado pela api e gera objeto para renderização
  const makeRecipeInProgress = (rec) => {
    let arrayInputs = [];

    if (rec && isDrink) {
      ({ drinks: arrayInputs } = rec);
    }
    if (rec && !isDrink) {
      ({ meals: arrayInputs } = rec);
    }
    if (arrayInputs) {
      const object = {
        img: isDrink ? arrayInputs[0].strDrinkThumb : arrayInputs[0].strMealThumb,
        name: isDrink ? arrayInputs[0].strDrink : arrayInputs[0].strMeal,
        foodId: isDrink ? arrayInputs[0].idDrink : arrayInputs[0].idMeal,
        category: arrayInputs[0].strCategory,
        instructions: arrayInputs[0].strInstructions,
        ingredients: getIngredients(arrayInputs[0]),
      };
      setRecipeInProgress(arrayInputs);
      setDisplayRecipeInProgress(object);
    }
  };

  const memo = useMemo(() => ({
    recipeName,
    setRecipe,
    displayRecipeInProgress,
    setDisplayRecipeInProgress,
    recipeInProgress,
    setRecipeInProgress,
    makeRecipeInProgress,
    isDrink,
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [recipeName, displayRecipeInProgress, recipeInProgress]);

  return (
    <RecipeContext.Provider value={ memo }>
      {children}
    </RecipeContext.Provider>
  );
}

RecipeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipeProvider;
