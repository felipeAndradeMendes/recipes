import React, { useEffect, useState } from 'react';
import clipboardCopy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
// OBJ DE TESTE PARA LOCAL STORAGE - SIMULA RECEITAS PRONTAS
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
//   type: 'drink',
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
const copy = clipboardCopy;
const twoSeconds = 2000;

function DoneRecipes() {
  // const history = useHistory();
  const [recipes, setRecipes] = useState([]);
  const [showLinkCopied, setShowLinkCopied] = useState(false);

  function handleShareClick(type, id) {
    // Confirmar se o tipo de receita é salvo no plural ou singular (Drink ou Drinks)
    copy(`http://localhost:3000/${type}s/${id}`);
    setShowLinkCopied(true);
    setTimeout(() => {
      setShowLinkCopied(false);
    }, twoSeconds);
  }

  // Filtra receitas de acordo como botão clicado;
  function handleClickFilters(btn) {
    if (btn === 'all') {
      return setRecipes(doneRecipesFromLocalStorage);
    }
    const filteredRecipes = doneRecipesFromLocalStorage
      .filter((recipe) => recipe.type === btn);
    setRecipes(filteredRecipes);
  }

  useEffect(() => {
    setRecipes(doneRecipesFromLocalStorage);
  }, []);

  return (
    <>
      <Header />
      <form>
        <button
          type="button"
          name="all"
          data-testid="filter-by-all-btn"
          onClick={ (e) => handleClickFilters(e.target.name) }
        >
          All
        </button>

        <button
          type="button"
          name="meal"
          data-testid="filter-by-meal-btn"
          onClick={ (e) => handleClickFilters(e.target.name) }
        >
          Meals
        </button>

        <button
          type="button"
          name="drink"
          data-testid="filter-by-drink-btn"
          onClick={ (e) => handleClickFilters(e.target.name) }
        >
          Drinks
        </button>
      </form>
      {/* DONE RECIPES MAP */}
      {recipes.map((recipe, index) => (
        <div
          key={ recipe.id }
        >
          <Link
            to={ `/${recipe.type}s/${recipe.id}` }
            type="button"

          >
            <img
              data-testid={ `${index}-horizontal-image` }
              style={ { width: '200px' } }
              src={ recipe.image }
              alt={ recipe.name }
            />
          </Link>
          <p data-testid={ `${index}-horizontal-top-text` }>
            { recipe.type === 'meal'
              ? (`${recipe.nationality} - ${recipe.category}`)
              : (`${recipe.alcoholicOrNot} - ${recipe.category}`) }
          </p>
          <Link to={ `/${recipe.type}s/${recipe.id}` }>
            <p data-testid={ `${index}-horizontal-name` }>
              { recipe.name }
            </p>
          </Link>
          <p data-testid={ `${index}-horizontal-done-date` }>
            {recipe.doneDate}
          </p>
          <button
            type="button"
            onClick={ () => handleShareClick(recipe.type, recipe.id) }
          >
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              alt="share icon"
            />
          </button>
          {showLinkCopied && <p>Link copied!</p>}
          {recipe.tags.map((tag, indexTag) => (
            <p key={ indexTag } data-testid={ `${index}-${tag}-horizontal-tag` }>
              { tag }
            </p>
          ))}
          <hr />
        </div>
      ))}
    </>
  );
}

export default DoneRecipes;
