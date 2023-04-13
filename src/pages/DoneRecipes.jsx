/* eslint-disable react/jsx-max-depth */
import React, { useEffect, useState } from 'react';
import clipboardCopy from 'clipboard-copy';
import { BiBorderAll, BiDrink } from 'react-icons/bi';
import { IoRestaurantOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { RxShare2 } from 'react-icons/rx';
import Header from '../components/Header';
// import shareIcon from '../images/shareIcon.svg';
// import doneRecipesArray from '../helpers/LocalStorageTest';

// localStorage.setItem('doneRecipes', JSON.stringify(doneRecipesArray));
// const doneRecipesFromLocalStorage = JSON.parse(localStorage.getItem('doneRecipes'));
const copy = clipboardCopy;

function DoneRecipes() {
  // const history = useHistory();
  const [recipes, setRecipes] = useState([]);
  const [showLinkCopied, setShowLinkCopied] = useState({});

  function handleShareClick(type, id) {
    // Confirmar se o tipo de receita é salvo no plural ou singular (Drink ou Drinks)
    copy(`http://localhost:3000/${type}s/${id}`);
    setShowLinkCopied({
      ...showLinkCopied,
      [id]: true,
    });
  }

  // Filtra receitas de acordo como botão clicado;
  function handleClickFilters(btn) {
    const doneRecipesFromLocalStorage = JSON.parse(localStorage.getItem('doneRecipes'));

    if (btn === 'all') {
      return setRecipes(doneRecipesFromLocalStorage);
    }
    const filteredRecipes = doneRecipesFromLocalStorage
      .filter((recipe) => recipe.type === btn);
    setRecipes(filteredRecipes);
  }

  useEffect(() => {
    const getLocalRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (getLocalRecipes) {
      return setRecipes(getLocalRecipes);
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
      {/* DONE RECIPES MAP */}
      {recipes.map((recipe, index) => (
        <div
          className="flex shadow-[0_2px_4px_1.5px_rgb(0,0,0,0.1)]
        max-w-[320px] m-auto items-center rounded-[10px] mb-4 gap-2"
          key={ recipe.id }
        >
          <Link
            to={ `/${recipe.type}s/${recipe.id}` }
            type="button"

          >
            <img
              data-testid={ `${index}-horizontal-image` }
              style={ { width: '140px' } }
              className="rounded-l-[10px]"
              src={ recipe.image }
              alt={ recipe.name }
            />
          </Link>
          <div
            className="flex flex-col pr-3"
          >
            <div className="flex justify-between items-center">
              <Link to={ `/${recipe.type}s/${recipe.id}` }>
                <p
                  className="text-md "
                  data-testid={ `${index}-horizontal-name` }
                >
                  { recipe.name }
                </p>
              </Link>
              <button
                type="button"
                onClick={ () => handleShareClick(recipe.type, recipe.id) }
              >
                {/* <img
                  data-testid={ `${index}-horizontal-share-btn` }
                  src={ shareIcon }
                  alt="share icon"
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
              {showLinkCopied[recipe.id] && <span className="text-xs">Link copied!</span>}
            </div>
            <p
              className="text-md "
              data-testid={ `${index}-horizontal-top-text` }
            >
              { recipe.type === 'meal'
                ? (`${recipe.nationality} - ${recipe.category}`)
                : (`${recipe.alcoholicOrNot} - ${recipe.category}`) }
            </p>
            <p
              className="text-md "
              data-testid={ `${index}-horizontal-done-date` }
            >
              Done when:
              {
                new Date(recipe.doneDate).toLocaleDateString('pt-BR', {
                  day: 'numeric',
                  month: 'numeric',
                  year: 'numeric',
                })
              }
            </p>

            {recipe.tags?.map((tag, indexTag) => (
              <p key={ indexTag } data-testid={ `${index}-${tag}-horizontal-tag` }>
                { tag }
              </p>
            ))}
            <hr />
          </div>
        </div>
      ))}
    </>
  );
}

export default DoneRecipes;
