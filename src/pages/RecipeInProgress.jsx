import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';
import useFetchRecipes from '../hooks/useFetchRecipes';
import '../App.css';

function RecipeInProgress() {
  const { showRecipeInProgress, makeRecipeInProgress,
    isDrink, setLocalStorage, getLocalStorage,
    handleFinishButton } = useContext(RecipeContext);

  const { makeFetch } = useFetchRecipes();
  const { id } = useParams();

  // estado com os ingredientes checkados ou não
  const [checkedIngredients, setCheckedIngredients] = useState({});

  const inProgressRecipes = 'inProgressRecipes';

  const getApiId = async () => {
    let endpoint = '';

    if (isDrink) {
      endpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    } else {
      endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    }
    const recipesResults = await makeFetch(endpoint);
    // console.log(recipesResults);
    makeRecipeInProgress(recipesResults);
  };

  const handleShareButton = () => {
  };

  const handleGoFavorite = () => {
  };

  const handleIngredientChange = (event) => {
    const ingredientName = event.target.name;
    const isChecked = event.target.checked;
    const ingredients = {
      ...checkedIngredients,
      [ingredientName]: isChecked,
    };
    console.log(ingredients);
    setCheckedIngredients(ingredients);
    setLocalStorage(inProgressRecipes, ingredients);
  };

  // função de pegar ingredientes ja marcado do local storage
  const getIngredientsLocalStorage = () => {
    const ingredientsLocalStorage = getLocalStorage(inProgressRecipes);
    if (ingredientsLocalStorage) {
      setCheckedIngredients(ingredientsLocalStorage);
    }
  };

  // função de validação do botton de concluir receita
  const isAllChecked = () => {
    if (showRecipeInProgress) {
      return showRecipeInProgress.ingredients
        .every((ingredient) => checkedIngredients[ingredient]);
    }
  };

  useEffect(() => {
    getApiId();
    // console.log(showRecipeInProgress);
    getIngredientsLocalStorage();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className="recipe-in-progress">
      { showRecipeInProgress && (
        <>
          <h1 data-testid="recipe-title">
            { showRecipeInProgress.name }
          </h1>
          <img
            src={ showRecipeInProgress.img }
            alt="recipe"
            data-testid="recipe-photo"
          />
          <button
            data-testid="share-btn"
            onClick={ handleShareButton }
          >
            Compartilhar
          </button>
          <button
            data-testid="favorite-btn"
            onClick={ handleGoFavorite }
          >
            Favoritos
          </button>
          <h4
            data-testid="recipe-category"
          >
            { showRecipeInProgress.category }
          </h4>
          <h3>Ingredientes</h3>
          <fieldset>
            { showRecipeInProgress.ingredients
              .map((ingredient, index) => (
                <label
                  htmlFor="ingredient"
                  data-testid={ `${index}-ingredient-step` }
                  key={ index }
                  className={ checkedIngredients[ingredient] ? 'checked' : undefined }
                >
                  { ingredient }
                  <input
                    type="checkbox"
                    name={ ingredient }
                    checked={ checkedIngredients[ingredient] || false }
                    onChange={ handleIngredientChange }
                  />
                </label>))}
          </fieldset>
          <h3>Instruções</h3>
          <div
            className="instructions"
            data-testid="instructions"
          >
            { showRecipeInProgress.instructions }
          </div>
          <button
            className="finish-recipe-btn"
            type="button"
            data-testid="finish-recipe-btn"
            value="finalizar"
            onClick={ handleFinishButton }
            disabled={ !isAllChecked() }
          >
            Finalizar
          </button>
        </>
      )}
    </div>
  );
}

export default RecipeInProgress;
