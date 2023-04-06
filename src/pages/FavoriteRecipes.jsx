import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
// import doneRecipesArray from '../helpers/LocalStorageTest';

// localStorage.setItem('favoriteRecipes', JSON.stringify(doneRecipesArray));
// const favoriteFromLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
const copy = clipboardCopy;
const twoSeconds = 2000;

function FavoriteRecipes() {
  const [favorites, setFavorites] = useState([]);
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
    const favoriteFromLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (btn === 'all') {
      return setFavorites(favoriteFromLocalStorage);
    }
    const filteredFavorites = favoriteFromLocalStorage
      .filter((recipe) => recipe.type === btn);
    setFavorites(filteredFavorites);
  }

  function handleFavoriteClick(recipeId) {
    // console.log('cliquei');
    // console.log(recipeId);
    // console.log('FAVORITE FROM LOCAL STORAGE:', favoriteFromLocalStorage);

    const newFavoritesArr = favorites
      .filter((recipe) => Number(recipe.id) !== Number(recipeId));

    console.log('NEW FAVORITE:', newFavoritesArr);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoritesArr));
    // setFavorites(newFavoritesArr);
    const favoriteFromLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavorites(favoriteFromLocalStorage);
  }

  useEffect(() => {
    const getLocalFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (getLocalFavorites) {
      return setFavorites(getLocalFavorites);
    }
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
      {favorites.map((recipe, index) => (
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
          {/* {recipe.tags.map((tag, indexTag) => (
            <p key={ indexTag } data-testid={ `${index}-${tag}-horizontal-tag` }>
              { tag }
            </p>
          ))} */}
          <button
            type="button"
            name={ recipe }
            onClick={ (e) => handleFavoriteClick(e.target.id) }
          >
            <img
              data-testid={ `${index}-horizontal-favorite-btn` }
              src={ blackHeartIcon }
              alt="blackHeartIcon"
              id={ recipe.id }
            />
          </button>
          <hr />
        </div>
      ))}
    </>
  );
}

// push

export default FavoriteRecipes;
