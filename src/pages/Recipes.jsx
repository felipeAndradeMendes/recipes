import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import SearchBarContext from '../context/SearchBarContext';

function Recipes() {
  const { dataApi, isLoading } = useContext(SearchBarContext);
  const history = useHistory();
  const pathName = history.location.pathname;
  const pathNameSplit = pathName === '/meals' ? 'meals' : 'drinks';
  const maxLength = 12;

  console.log(dataApi[pathNameSplit]);

  const isGreaterThan12 = dataApi[pathNameSplit]?.length > maxLength
    ? dataApi[pathNameSplit].splice(0, maxLength) : dataApi[pathNameSplit];

  return (
    <>
      <Header />
      {
        isLoading ? <p>Loading...</p> : (
          <section>
            {
              isGreaterThan12?.map((recipe, index) => (
                <div data-testid={ `${index}-recipe-card` } key={ index }>
                  <img
                    src={ recipe.strMealThumb || recipe.strDrinkThumb }
                    alt={ recipe.strMeal || recipe.strDrink }
                    data-testid={ `${index}-card-img` }
                  />
                  <p data-testid={ `${index}-horizontal-top-text` }>
                    { recipe.strAlcoholic || recipe.strCategory }
                  </p>
                  <p data-testid={ `${index}-card-name` }>
                    { recipe.strMeal || recipe.strDrink }
                  </p>
                </div>
              ))
            }
          </section>
        )
      }
    </>
  );
}

export default Recipes;
