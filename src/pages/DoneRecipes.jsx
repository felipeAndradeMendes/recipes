import React from 'react';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

// const doneRecipesArray = [{
//   id: 0,
//   type: 'meal',
//   nationality: 'brasileira',
//   category: 'chicken',
//   alcoholicOrNot: '',
//   name: 'Receitão Xablau',
//   image: 'https://assets.epicurious.com/photos/62f16ed5fe4be95d5a460eed/1:1/w_960,c_limit/RoastChicken_RECIPE_080420_37993.jpg',
//   doneDate: '04/04/2023',
//   tags: ['frango', 'comida'],
// },
// {
//   id: 1,
//   type: 'meal',
//   nationality: 'americana',
//   category: 'beef',
//   alcoholicOrNot: '',
//   name: 'Receitão sinistro',
//   image: 'https://cdn.britannica.com/18/137318-050-29F7072E/rooster-Rhode-Island-Red-roosters-chicken-domestication.jpg?w=400&h=300&c=crop',
//   doneDate: '05/04/2023',
//   tags: ['galo', 'rango'],
// }];

// localStorage.setItem('doneRecipes', JSON.stringify(doneRecipesArray));
const doneRecipesFromLocalStorage = JSON.parse(localStorage.getItem('doneRecipes'));
// console.log(doneRecipesFromLocalStorage);

function DoneRecipes() {
  return (
    <>
      <Header />
      <form>
        <button
          type="button"
          name="all"
          data-testid="filter-by-all-btn"
        >
          All
        </button>

        <button
          type="button"
          name="Meals"
          data-testid="filter-by-meal-btn"
        >
          Meals
        </button>

        <button
          type="button"
          name="Drinks"
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>
      </form>
      {doneRecipesFromLocalStorage.map((recipe, index) => (
        <div key={ recipe.id }>
          <img
            data-testid={ `${index}-horizontal-image` }
            src={ recipe.image }
            alt={ recipe.name }
          />
          <p data-testid={ `${index}-horizontal-top-text` }>
            { recipe.category }
          </p>
          <p data-testid={ `${index}-horizontal-name` }>
            { recipe.name }
          </p>
          <p data-testid={ `${index}-horizontal-done-date` }>
            {recipe.doneDate}
          </p>
          <img
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
            alt="share icon"
          />
          {recipe.tags.map((tag, indexTag) => (
            <p key={ indexTag } data-testid={ `${index}-${tag}-horizontal-tag` }>
              { tag }
            </p>
          ))}
        </div>

      ))}
    </>
  );
}

export default DoneRecipes;
