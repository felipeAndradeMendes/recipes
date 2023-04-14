/* eslint-disable max-lines */
/* eslint-disable react/jsx-max-depth */
import React, { useEffect, useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { AiOutlineShareAlt } from 'react-icons/ai';
import { MdOutlineFavoriteBorder, MdFavorite } from 'react-icons/md';
import clipboardCopy from 'clipboard-copy';
import Carousel from '../components/Carousel';
import Loading from '../components/Loading';

function RecipeDetails() {
  const [recipe, setRecipe] = useState({});
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [showStartBtn, setShowStartBtn] = useState(true);
  const [doneBtn, setDoneBtn] = useState('Start Recipe');
  const [showCopy, setShowCopy] = useState(false);
  const [intervalID, setIntervalID] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);
  const pathName = useHistory().location.pathname;
  const { id } = useParams();
  const sliceMax = 6;
  const copy = clipboardCopy;
  const pathNameSplit = pathName.includes('meals') ? 'meals' : 'drinks';

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const isFavorites = favorites.some((favorite) => favorite.id === id);
    if (isFavorites) setIsFavorite(true);
  }, [id]);
  useEffect(() => {
    if (pathName.includes('meals')) {
      setLoading(true);
      fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
        .then((response) => response.json())
        .then((data) => {
          setDrinks(data.drinks.slice(0, sliceMax));
          setLoading(false);
        });
      setLoading(true);
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((response) => response.json())
        .then((data) => {
          setRecipe(data.meals[0]);
          setLoading(false);
        });
    } else {
      setLoading(true);
      fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        .then((response) => response.json())
        .then((data) => {
          setMeals(data.meals.slice(0, sliceMax));
          setLoading(false);
        });
      setLoading(true);
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((response) => response.json())
        .then((data) => {
          setRecipe(data.drinks[0]);
          setLoading(false);
        });
    }
  }, [pathName, id]);
  useEffect(() => {
    const ingredientsArray = [];
    const lintChato = -1;
    if (recipe) {
      Object.keys(recipe).forEach((key) => {
        if (key.includes('Ingredient') && recipe[key] !== null) {
          const index = key.slice(lintChato);
          const ingredientObj = { strIngredients: recipe[key] };
          if (recipe[`strMeasure${index}`]) {
            ingredientObj.strMeasure = recipe[`strMeasure${index}`];
          }
          ingredientsArray.push(ingredientObj);
        }
      });
    }
    setIngredients(ingredientsArray);
  }, [recipe]);
  useEffect(() => {
    const getRecipesDone = JSON.parse(localStorage.getItem('doneRecipes'));
    if (getRecipesDone) {
      const recipeCompleted = getRecipesDone.find((recipeDone) => recipeDone.id === id);
      if (recipeCompleted) {
        setShowStartBtn(false);
      }
      setShowStartBtn(true);
    }
  }, [id]);
  useEffect(() => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (inProgressRecipes) {
      const chavesId = Object.keys(inProgressRecipes[pathNameSplit]);
      chavesId.forEach((chave) => {
        if (chave === id) {
          setDoneBtn('Continue Recipe');
        }
      });
    }
  }, [pathName, id, pathNameSplit]);
  useEffect(() => {
    const seconds = 2000;
    if (showCopy) {
      const intervalId = setInterval(() => {
        setIntervalID(intervalId);
        setShowCopy(false);
      }, seconds);
    }
  }, [showCopy]);
  const handleFavorite = (favorite) => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const repeatedFavorite = favorites.some(
      (favoriteRecipe) => favoriteRecipe.id === favorite.idMeal
      || favoriteRecipe.id === favorite.idDrink,
    );
    if (repeatedFavorite) {
      setIsFavorite(!isFavorite);
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
      setIsFavorite(!isFavorite);
      const { strMeal, strArea, strCategory, idMeal, strMealThumb } = favorite;
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
      setIsFavorite(!isFavorite);
      const { strDrink, strCategory, idDrink, strDrinkThumb, strAlcoholic } = favorite;
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
  };
  return (
    <section
      className="relative p-0 pb-[4.5rem]"
    >
      {
        loading ? <Loading /> : (
          <>
            <img
              src={ recipe.strMealThumb || recipe.strDrinkThumb }
              alt={ recipe.strMeal || recipe.strDrink }
              data-testid="recipe-photo"
              className="absolute"
            />
            <div className="relative h-[361px] bg-black opacity-40 " />
            <div className="absolute w-full top-0">
              <div className="flex justify-between p-5 w-full">
                <h2 data-testid="recipe-category" className="text-2xl text-white">
                  {`${recipe.strCategory}
       ${pathName.includes('meals') ? '' : recipe.strAlcoholic}`}
                </h2>
                <div className="flex gap-2">
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
                      size={ 30 }
                    />
                  </button>
                  {
                    showCopy ? <span className="text-white">Link copied!</span> : null
                  }
                  <button
                    type="button"
                    onClick={ () => handleFavorite(recipe) }
                  >
                    {isFavorite ? <MdFavorite color="white" size={ 30 } />
                      : <MdOutlineFavoriteBorder color="white" size={ 30 } />}
                  </button>
                </div>
              </div>
              <h2
                className="text-white text-4xl text-center pt-10"
                data-testid="recipe-title"
              >
                {recipe.strMeal || recipe.strDrink}
              </h2>
            </div>
            <div className="px-4">
              <h3 className="text-2xl font-bold pt-10">Ingredients</h3>
              <ul className="border border-gray-400 rounded-md p-4">
                {
                  ingredients.map((ingredient, index) => (
                    <li
                      key={ index }
                      data-testid={ `${index}-ingredient-name-and-measure` }
                    >
                      {`${ingredient.strMeasure === undefined
                        ? '' : ingredient.strMeasure} 
                ${ingredient.strIngredients}`}
                    </li>
                  ))
                }
              </ul>
            </div>
            <div className="px-4 pb-10">
              <h3 className="text-2xl font-bold pt-10">Instructions</h3>
              <p
                className="border border-gray-400 rounded-md p-4"
                data-testid="instructions"
              >
                {recipe.strInstructions}
              </p>
            </div>
            {
              pathName.includes('meals') ? (
                <iframe
                  data-testid="video"
                  src={ recipe.strYoutube }
                  title="YouTube video player"
                  allow="accelerometer; clipboard-write;
             encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-[30vh]"
                />
              ) : null
            }
            {
              showStartBtn ? (
                <Link
                  to={ `${pathName}/in-progress` }
                  className="flex justify-center items-center"
                >
                  <button
                    data-testid="start-recipe-btn"
                    className="start-recipe-btn"
                    type="button"
                  >
                    {doneBtn}
                  </button>
                </Link>
              ) : null
            }

            <h3 className="text-2xl font-bold pt-10 pl-4 pb-2">Recomendation</h3>
            <Carousel
              pathName={ pathName }
              meals={ meals }
              drinks={ drinks }
            />
          </>
        )
      }
    </section>
  );
}

export default RecipeDetails;
