import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';
import useFetchRecipes from '../hooks/useFetchRecipes';

function RecipeInProgress() {
  const { showRecipeInProgress, makeRecipeInProgress,
    isDrink } = useContext(RecipeContext);

  const { makeFetch } = useFetchRecipes();
  const { id } = useParams();

  const getApiId = async () => {
    let endpoint = '';

    if (isDrink) {
      endpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    } else {
      endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    }
    const recipesResults = await makeFetch(endpoint);
    console.log(recipesResults);
    makeRecipeInProgress(recipesResults);
  };

  const handleShareButton = () => {
  };

  const handleGoFavorite = () => {
  };

  const handleFinishButton = () => {
  };

  useEffect(() => {
    getApiId();
    console.log(showRecipeInProgress);
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
                >
                  { ingredient }
                  <input
                    type="checkbox"
                    name={ ingredient }
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
          >
            Finalizar
          </button>
        </>
      )}
    </div>
  );
}

export default RecipeInProgress;
