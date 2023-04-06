import React, { useEffect, useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import Carousel from '../components/Carousel';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

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
  const pathName = useHistory().location.pathname;
  const { id } = useParams();
  const sliceMax = 6;
  const copy = clipboardCopy;

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const isFavorites = favorites.some((favorite) => favorite.id === id);
    if (isFavorites) setIsFavorite(true);
  }, [id]);
  useEffect(() => {
    if (pathName.includes('meals')) {
      fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
        .then((response) => response.json())
        .then((data) => {
          setDrinks(data.drinks.slice(0, sliceMax));
        });
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((response) => response.json())
        .then((data) => {
          setRecipe(data.meals[0]);
        });
    } else {
      fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        .then((response) => response.json())
        .then((data) => {
          setMeals(data.meals.slice(0, sliceMax));
        });
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((response) => response.json())
        .then((data) => {
          setRecipe(data.drinks[0]);
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
      const recipeInProgress = inProgressRecipes[pathName
        .includes('meals') ? 'meals' : 'drinks'][id];
      if (recipeInProgress) {
        setDoneBtn('Continue Recipe');
      }
    }
  }, [pathName, id]);
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
    <section>
      <h1>Recipe Details</h1>
      <h2 data-testid="recipe-title">{recipe.strMeal || recipe.strDrink}</h2>
      <img
        src={ recipe.strMealThumb || recipe.strDrinkThumb }
        alt={ recipe.strMeal || recipe.strDrink }
        data-testid="recipe-photo"
      />
      <h2 data-testid="recipe-category">
        {`${recipe.strCategory}
       ${pathName.includes('meals') ? '' : recipe.strAlcoholic}`}

      </h2>
      <h3>Ingredients</h3>
      <ul>
        {
          ingredients.map((ingredient, index) => (
            <li
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {`${ingredient.strMeasure === undefined ? '' : ingredient.strMeasure} 
                ${ingredient.strIngredients}`}
            </li>
          ))
        }
      </ul>
      <h3>Instructions</h3>
      <p data-testid="instructions">{recipe.strInstructions}</p>
      {
        pathName.includes('meals') ? (
          <iframe
            data-testid="video"
            src={ recipe.strYoutube }
            title="YouTube video player"
            allow="accelerometer; clipboard-write;
             encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : null
      }
      {
        showStartBtn ? (
          <Link to={ `${pathName}/in-progress` }>
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
      <button
        type="button"
        data-testid="share-btn"
        onClick={ () => {
          clearInterval(intervalID);
          copy(`http://localhost:3000${pathName}`);
          setShowCopy(true);
        } }
      >
        <img
          src={ shareIcon }
          alt={ recipe.strMeal || recipe.strDrink }
        />
      </button>
      {
        showCopy ? <span>Link copied!</span> : null
      }
      <button
        type="button"
        onClick={ () => handleFavorite(recipe) }
      >
        <img
          data-testid="favorite-btn"
          src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
          alt="favorite"
        />
      </button>
      <h3>Recomendadas</h3>
      <Carousel
        pathName={ pathName }
        meals={ meals }
        drinks={ drinks }
      />
    </section>
  );
}

export default RecipeDetails;
