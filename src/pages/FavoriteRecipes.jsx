import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import { BiBorderAll, BiDrink } from 'react-icons/bi';
import { IoRestaurantOutline } from 'react-icons/io5';
import { IoMdHeart } from 'react-icons/io';
import { RxShare2 } from 'react-icons/rx';
import Header from '../components/Header';
// import doneRecipesArray from '../helpers/LocalStorageTest';

// localStorage.setItem('favoriteRecipes', JSON.stringify(doneRecipesArray));
// const favoriteFromLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
const copy = clipboardCopy;

function FavoriteRecipes() {
  const [favorites, setFavorites] = useState([]);
  // const [showLinkCopied, setShowLinkCopied] = useState(false);

  function handleShareClick(type, id) {
    // Confirmar se o tipo de receita é salvo no plural ou singular (Drink ou Drinks)
    copy(`http://localhost:3000/${type}s/${id}`);
    // setShowLinkCopied(true);
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
    const newFavoritesArr = favorites
      .filter((recipe) => Number(recipe.id) !== Number(recipeId));

    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoritesArr));
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
      <form className="flex max-w-[200px] m-auto justify-between pt-4 pb-4">
        <button
          type="button"
          name="all"
          data-testid="filter-by-all-btn"
          onClick={ () => handleClickFilters('all') }
          className="w-14 h-14 flex justify-center flex-col
            items-center border-2 border-[#0a9b61] rounded-full
           hover:bg-[#0a9b61] hover:text-white"
        >
          <BiBorderAll
            style={ { width: '24px', height: '24px' } }
          />
        </button>

        <button
          type="button"
          name="meal"
          data-testid="filter-by-meal-btn"
          onClick={ () => handleClickFilters('meal') }
          className="w-14 h-14 flex justify-center flex-col
          items-center border-2 border-[#0a9b61] rounded-full
         hover:bg-[#0a9b61] hover:text-white"
        >
          <IoRestaurantOutline
            style={ { width: '24px', height: '24px' } }
          />
        </button>

        <button
          type="button"
          name="drink"
          data-testid="filter-by-drink-btn"
          onClick={ () => handleClickFilters('drink') }
          className="w-14 h-14 flex justify-center flex-col
          items-center border-2 border-[#0a9b61] rounded-full
         hover:bg-[#0a9b61] hover:text-white"
        >
          <BiDrink
            style={ { width: '24px', height: '24px' } }
          />
        </button>
      </form>
      <section className="flex justify-center flex-wrap">
        {/* DONE RECIPES MAP */}
        {favorites.map((recipe, index) => (
          <div
            key={ recipe.id }
            className="flex shadow-[0_2px_4px_1.5px_rgb(0,0,0,0.1)]
            max-w-[320px] m-auto items-center pr-2 rounded-[10px] mb-4"
          >
            <Link
              to={ `/${recipe.type}s/${recipe.id}` }
              type="button"

            >
              <img
                data-testid={ `${index}-horizontal-image` }
                style={ { width: '140px' } }
                src={ recipe.image }
                alt={ recipe.name }
                className="rounded-l-[10px]"
              />
            </Link>
            <div className="w-[140px] ml-4 h-[100px]">
              <Link to={ `/${recipe.type}s/${recipe.id}` }>
                <p className="font-bold" data-testid={ `${index}-horizontal-name` }>
                  { recipe.name }
                </p>
              </Link>
              <p
                data-testid={ `${index}-horizontal-top-text` }
                className="text-[#797D86] text-[0.75rem]"
              >
                { recipe.type === 'meal'
                  ? (`${recipe.nationality} - ${recipe.category}`)
                  : (`${recipe.alcoholicOrNot} - ${recipe.category}`) }
              </p>
            </div>
            <p data-testid={ `${index}-horizontal-done-date` }>
              {recipe.doneDate}
            </p>
            <div className="flex flex-col justify-start h-[100px]">
              <button
                type="button"
                onClick={ () => handleShareClick(recipe.type, recipe.id) }
              >
                {/* <img
                  data-testid={ `${index}-horizontal-share-btn` }
                  src={ shareIcon }
                  alt="share icon"
                  className="mb-2"
                  style={ { color: 'red ' } }
                /> */}
                <div
                  className="mb-2 border-2 bg-white rounded-full
                  w-10 h-10 items-center flex justify-center
                  hover:border-[#0a9b61] delay-75"
                >
                  <RxShare2
                    style={ { width: '24px', height: '24px', color: '#80E78B' } }
                  />
                </div>

              </button>
              {/* {showLinkCopied && <p>Link copied!</p>} */}
              {/* {recipe.tags.map((tag, indexTag) => (
            <p key={ indexTag } data-testid={ `${index}-${tag}-horizontal-tag` }>
              { tag }
            </p>
          ))} */}
              <button
                type="button"
                name={ recipe }
                onClick={ () => handleFavoriteClick(recipe.id) }
              >
                {/* <img
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  src={ blackHeartIcon }
                  alt="blackHeartIcon"
                  id={ recipe.id }
                  style={ { fill: 'red' } }
                /> */}
                <div
                  className="mb-2 border-2 bg-white rounded-full
                  w-10 h-10 items-center flex justify-center"
                >
                  <IoMdHeart
                    id={ recipe.id }
                    style={ { width: '24px', height: '24px', color: 'red' } }
                  />
                </div>
              </button>
            </div>
            <hr />
          </div>
        ))}
      </section>
    </>
  );
}

// push

export default FavoriteRecipes;
