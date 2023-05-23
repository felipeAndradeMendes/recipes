/* eslint-disable react/jsx-max-depth */
/* eslint-disable max-lines */
import React, { useContext, useEffect, useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import { AiOutlineShareAlt } from 'react-icons/ai';
import { MdOutlineFavoriteBorder, MdFavorite } from 'react-icons/md';
import { BsCheckLg } from 'react-icons/bs';
import { IoIosArrowBack } from 'react-icons/io';
import RecipeContext from '../context/RecipeContext';
import useFetchRecipes from '../hooks/useFetchRecipes';
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
    <section className="recipe-in-progress relative p-0 w-[360px]">
      { getRecipe[pathNameSlice] && (
        <div>
          <img
            className="absolute z-0"
            src={ getRecipe[pathNameSlice][0].strDrinkThumb
              || getRecipe[pathNameSlice][0].strMealThumb }
            alt="recipe"
            data-testid="recipe-photo"
          />
          <div className="absolute top-0 h-[360px] w-full bg-black opacity-20" />
          <div className="absolute w-full top-0">
            <div className="max-w-[320px] m-auto mt-6 flex justify-between h-[30px]">
              <Link to="/drinks">
                <IoIosArrowBack
                  style={ { width: '24', height: '24px', color: 'white' } }
                  data-testid="profile-top-btn"
                />
              </Link>
              <div className="flex gap-4">
                {
                  showCopy
                    ? (
                      <span
                        className="text-white
                          pt-1 pb-1 pr-2 pl-2
                          rounded-[10px] bg-black/50
                          font-bold"
                      >
                        Link copied
                      </span>
                    )
                    : null
                }
                <button
                  type="button"
                  data-testid="share-btn"
                  onClick={ () => {
                    clearInterval(intervalID);
                    copy(`http://localhost:3000${pathName}`);
                    setShowCopy(true);
                  } }
                  className="text-white"
                >
                  <AiOutlineShareAlt
                    size={ 24 }
                  />
                </button>
                <button
                  type="button"
                  onClick={ () => handleFavorite(getRecipe) }
                >
                  {favoriteProgress ? <MdFavorite color="white" size={ 24 } />
                    : <MdOutlineFavoriteBorder color="white" size={ 24 } />}
                </button>
              </div>
            </div>
            <div className="flex justify-between p-5">
              <h4
                className="text-2xl text-white"
                data-testid="recipe-category"
              >
                { getRecipe[pathNameSlice][0].strCategory
                || getRecipe[pathNameSlice][0].strAlcoholic }
              </h4>
            </div>
            <h1
              data-testid="recipe-title"
              className="text-white text-4xl text-center"
            >
              { getRecipe[pathNameSlice][0].strDrink
              || getRecipe[pathNameSlice][0].strMeal }
            </h1>
          </div>
          <div className="relative top-[320px] pt-10 bg-white rounded-[40px]">
            <div className="max-w-[320px] m-auto">
              <h3
                className="text-2xl font-bold mt-6 mb-2"
              >
                Ingredientes
              </h3>
              <div>
                { showRecipeInProgress.ingredients
                  .map((ingredient, index) => (
                    <div
                      key={ index }
                      className="flex items-center"
                    >
                      <label
                        htmlFor="ingredient"
                        data-testid={ `${index}-ingredient-step` }
                        key={ index }
                        className={ checkedIngredients[ingredient]
                          ? 'text-[#50a158] flex items-center' : 'flex items-center' }
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
            </div>
            <div className="px-4 pb-4">
              <h3 className="text-2xl font-bold mt-6 mb-2">Instructions</h3>
              <div className="border-l-4 border-[#80E78B] pt-2 pb-2 mb-2">
                <div
                  data-testid="instructions"
                  className="ml-4"
                >
                  { getRecipe[pathNameSlice][0].strInstructions }
                </div>
              </div>
            </div>
            <div className="flex justify-center pb-3">
              <button
                type="button"
                data-testid="finish-recipe-btn"
                value="finalizar"
                onClick={ () => handleFinishButton(getRecipe, pathName) }
                disabled={ !isAllChecked() }
              >
                <div
                  className="flex items-center justify-center
            bg-green-500 rounded-full w-14 h-14 m-auto"
                >
                  <BsCheckLg
                    style={ { width: '24px', height: '24px', color: 'white' } }
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
export default RecipeInProgress;
