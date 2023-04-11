/* eslint-disable max-lines */
import React, { useContext, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import RecipeContext from '../context/RecipeContext';
import useFetchRecipes from '../hooks/useFetchRecipes';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import '../App.css';

function RecipeInProgress() {
  const { showRecipeInProgress, makeRecipeInProgress,
    getLocalStorage,
    handleFinishButton } = useContext(RecipeContext);

  const { makeFetch } = useFetchRecipes();
  const { id } = useParams();
  const pathName = useHistory().location.pathname;
  const pathNameSlice = pathName.includes('meals') ? 'meals' : 'drinks';
  const copy = clipboardCopy;

  // estado com os ingredientes checkados ou não
  const [checkedIngredients, setCheckedIngredients] = useState({});
  const [showCopy, setShowCopy] = useState(false);
  const [getRecipe, setRecipe] = useState({});
  const [favoriteProgress, setFavorite] = useState(false);

  const inProgressRecipes = 'inProgressRecipes';
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const isFavorites = favorites.some((favorite) => favorite.id === id);
    if (isFavorites) {
      setFavorite(true);
    }
  }, [id]);
  const getApiId = async () => {
    let endpoint = '';

    if (pathName.includes('drinks')) {
      endpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    } else {
      endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    }
    const recipesResults = await makeFetch(endpoint);
    setRecipe(recipesResults);
    makeRecipeInProgress(recipesResults);
  };

  const handleFavorite = (favorite) => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const idRecipe = pathNameSlice === 'meals' ? 'idMeal'
      : 'idDrink';
    const repeatedFavorite = favorites.some(
      (favoriteRecipe) => favoriteRecipe.id
      === favorite[pathNameSlice][0][idRecipe],
    );
    if (repeatedFavorite) {
      setFavorite(!favoriteProgress);
      const removeIndex = favorites.findIndex(
        (favoriteRecipe) => favoriteRecipe.id === favorite.idMeal
        || favoriteRecipe.id === favorite.idDrink,
      );
      const remove = favorites.slice();
      remove.splice(removeIndex, 1);
      localStorage.setItem('favoriteRecipes', JSON.stringify(remove));
      return;
    }
    let newFavoriteRecipes = [];
    if (pathName.includes('meals')) {
      const { strMeal, strArea, strCategory, idMeal, strMealThumb } = favorite.meals[0];
      const newFavoriteMeal = {
        id: idMeal,
        type: 'meal',
        nationality: strArea || null,
        category: strCategory,
        alcoholicOrNot: '',
        name: strMeal,
        image: strMealThumb,
      };
      newFavoriteRecipes = [...favorites, newFavoriteMeal];
    } else if (pathName.includes('drinks')) {
      const { strDrink, strCategory,
        idDrink, strDrinkThumb, strAlcoholic } = favorite.drinks[0];
      const newFavoriteDrink = {
        id: idDrink,
        type: 'drink',
        nationality: '',
        category: strCategory,
        alcoholicOrNot: strAlcoholic === 'Alcoholic' ? strAlcoholic : '',
        name: strDrink,
        image: strDrinkThumb,
      };
      newFavoriteRecipes = [...favorites, newFavoriteDrink];
    }
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
    setFavorite(!favoriteProgress);
  };

  const handleIngredientChange = (event) => {
    const ingredientName = event.target.name;
    const isChecked = event.target.checked;
    setCheckedIngredients({ ...checkedIngredients, [ingredientName]: isChecked });

    const getLocalData = localStorage.getItem(inProgressRecipes);
    const data = getLocalData ? JSON.parse(getLocalData) : { drinks: {}, meals: {} };

    if (pathName.includes('drinks')) {
      data.drinks[id] = { ...data.drinks[id], [ingredientName]: isChecked };
    } else if (pathName.includes('meals')) {
      data.meals[id] = { ...data.meals[id], [ingredientName]: isChecked };
    }
    localStorage.setItem(inProgressRecipes, JSON.stringify(data));
  };

  // função de pegar ingredientes ja marcado do local storage
  const getIngredientsLocalStorage = () => {
    const ingredientsLocalStorage = getLocalStorage(inProgressRecipes);
    if (ingredientsLocalStorage) {
      if (pathName.includes('drinks')) {
        setCheckedIngredients(ingredientsLocalStorage.drinks[id] || {});
      } else if (pathName.includes('meals')) {
        setCheckedIngredients(ingredientsLocalStorage.meals[id] || {});
      }
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
    getIngredientsLocalStorage();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className="recipe-in-progress flex-auto items-center w-[360px]">
      { showRecipeInProgress && (
        <div className="justify-center">
          <h1
            data-testid="recipe-title"
            className="font-epilogue font-extrabold text-3xl leading-10
            tracking-wider text-center uppercase bg-green-600 text-gray-900
            flex justify-center"
          >
            { showRecipeInProgress.name }
          </h1>
          <img
            className="w-auto h-auto flex justify-center"
            src={ showRecipeInProgress.img }
            alt="recipe"
            data-testid="recipe-photo"
          />
          <div className="flex justify-center gap-10 bg-green-600 ">
            <button
              className="flex items-center justify-center bg-gray-200
              hover:bg-gray-300 p-2 rounded"
              data-testid="share-btn"
              onClick={ () => {
                copy(`http://localhost:3000/${pathNameSlice}/${id}`);
                setShowCopy(true);
              } }
            >
              <img
                className="h-5 w-5"
                src={ shareIcon }
                alt={ showRecipeInProgress.name }
              />
            </button>
            {
              showCopy ? <span>Link copied!</span> : null
            }
            <button
              // data-testid="favorite-btn"
              className="flex items-center justify-center bg-gray-200
              hover:bg-gray-300 p-2 rounded"
              onClick={ () => handleFavorite(getRecipe) }
            >
              <img
                className="h-5 w-5"
                data-testid="favorite-btn"
                src={ !favoriteProgress ? whiteHeartIcon : blackHeartIcon }
                alt="favorite"
              />
            </button>
          </div>
          <h4
            className=" flex items-center justify-center bg-green-600"
            data-testid="recipe-category"
          >
            { showRecipeInProgress.category }
          </h4>
          <h3
            className="font-sans font-bold text-xl leading-6 text-gray-800"
          >
            Ingredientes
          </h3>
          <fieldset
            className="box-border border-gray-400 border-dotted border-2
            rounded-lg"
          >
            <div
              className="gap-4"
            >
              { showRecipeInProgress.ingredients
                .map((ingredient, index) => (
                  <div
                    key={ index }
                    className=" ml-2 flex items-center"
                  >
                    <label
                      htmlFor="ingredient"
                      data-testid={ `${index}-ingredient-step` }
                      key={ index }
                      className={ checkedIngredients[ingredient] ? 'checked' : undefined }
                    >
                      { ingredient }
                      <input
                        className="ml-1"
                        type="checkbox"
                        name={ ingredient }
                        checked={ checkedIngredients[ingredient] || false }
                        onChange={ handleIngredientChange }
                      />
                    </label>
                  </div>
                ))}
            </div>
          </fieldset>
          <h3
            className="font-sans font-bold text-xl leading-6 text-gray-800"
          >
            Instruções
          </h3>
          <div
            className="box-border border-gray-400 border-dotted border-2
            rounded-lg"
          >
            <div
              className="instructions"
              data-testid="instructions"
            >
              { showRecipeInProgress.instructions }
            </div>
          </div>
          <div
            className="flex items-center justify-center bg-gray-200
            hover:bg-gray-300 p-2 rounded"
          >
            <button
              className="finish-recipe-btn"
              type="button"
              data-testid="finish-recipe-btn"
              value="finalizar"
              onClick={ () => handleFinishButton(getRecipe, pathName) }
              disabled={ !isAllChecked() }
            >
              Finalizar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export default RecipeInProgress;
