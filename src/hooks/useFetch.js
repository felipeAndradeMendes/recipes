import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import SearchBarContext from '../context/SearchBarContext';

function useFetch() {
  const { setDataApi, setIsLoading } = useContext(SearchBarContext);
  const history = useHistory();

  const makeFetch = (value, type) => {
    if (type === 'f' && value.length >= 2) {
      return global.alert('Your search must have only 1 (one) character');
    }

    const url = history.location.pathname.includes('meals')
      ? 'https://www.themealdb.com/api/json/v1/1/'
      : 'https://www.thecocktaildb.com/api/json/v1/1/';

    const customUrl = type === 'i'
      ? `${url}filter.php?${type}=${value}`
      : `${url}search.php?${type}=${value}`;
    setIsLoading(true);
    fetch(customUrl)
      .then((response) => response.json())
      .then((result) => {
        setDataApi(result);
        setIsLoading(false);

        if (result.meals === null || result.drinks === null) {
          global.alert('Sorry, we haven\'t found any recipes for these filters.');
          return;
        }

        const keys = Object.keys(result)[0];
        const recipe = result[keys];

        if (recipe.length === 1) {
          const id = recipe[0].idDrink || recipe[0].idMeal;
          history.push(`/${keys}/${id}`);
        }
      });
  };
  return [makeFetch];
}

export default useFetch;
