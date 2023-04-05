import React, { useEffect, useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

function RecipeDetails() {
  const [recipe, setRecipe] = useState({});
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const pathName = useHistory().location.pathname;
  const { id } = useParams();
  const spliceMax = 6;

  useEffect(() => {
    if (pathName.includes('meals')) {
      fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
        .then((response) => response.json())
        .then((data) => {
          setDrinks(data.drinks.splice(0, spliceMax));
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
          setMeals(data.meals.splice(0, spliceMax));
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
      <Link to={ `${pathName}/in-progress` }>
        <button
          data-testid="start-recipe-btn"
          className="start-recipe-btn"
          type="button"
        >
          Start Recipe
        </button>
      </Link>
      <h3>Recomendadas</h3>
      <Swiper
        slidesPerView={ 2 }
      >
        {
          pathName.includes('meals') ? (
            drinks.map((drink, index) => (
              <SwiperSlide key={ drink.idDrink }>
                <div data-testid={ `${index}-recommendation-card` }>
                  <img
                    style={ { width: '300px' } }
                    src={ drink.strDrinkThumb }
                    alt={ drink.strDrink }
                  />
                  <p data-testid={ `${index}-recommendation-title` }>
                    {drink.strDrink}
                  </p>
                </div>
              </SwiperSlide>
            ))
          ) : (
            meals.map((meal, index) => (
              <SwiperSlide key={ meal.idMeal }>
                <div data-testid={ `${index}-recommendation-card` }>
                  <img
                    style={ { width: '300px' } }
                    src={ meal.strMealThumb }
                    alt={ meal.strMeal }
                  />
                  <p data-testid={ `${index}-recommendation-title` }>
                    {meal.strMeal}
                  </p>
                </div>
              </SwiperSlide>
            ))
          )
        }
      </Swiper>
    </section>
  );
}

export default RecipeDetails;
