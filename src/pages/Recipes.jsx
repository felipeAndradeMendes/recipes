import React, { useContext, useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Header from '../components/Header';
import SearchBarContext from '../context/SearchBarContext';
import Footer from '../components/Footer';

function Recipes() {
  const { dataApi, setDataApi } = useContext(SearchBarContext);
  const [categories, setCategories] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const history = useHistory();
  const pathName = history.location.pathname;
  const pathNameSplit = pathName === '/meals' ? 'meals' : 'drinks';
  const maxLength = 12;

  useEffect(() => {
    if (pathName === '/meals') {
      setCategories(['Beef', 'Breakfast', 'Chicken', 'Dessert', 'Goat']);
    } else {
      setCategories(['Ordinary Drink', 'Cocktail',
        'Shake', 'Other/Unknown', 'Cocoa']);
    }
  }, [pathName]);

  useEffect(() => {
    const fetchApi = async () => {
      if (pathName === '/meals') {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        const data = await response.json();
        setDataApi({ meals: data.meals });
        setLoading(false);
      } else {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        const data = await response.json();
        setDataApi({ drinks: data.drinks });
        setLoading(false);
      }
    };
    fetchApi();
  }, [pathName, setDataApi, setLoading]);

  const handleChangeCategory = async (category) => {
    if (category === selectedCategory || category === 'all') {
      setSelectedCategory('');
      const url = pathName === '/meals'
        ? 'https://www.themealdb.com/api/json/v1/1/search.php?s='
        : 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      setLoading(true);
      const response = await fetch(url);
      const data = await response.json();
      setDataApi({ meals: data.meals, drinks: data.drinks });
      setLoading(false);
    } else {
      const apiUrl = pathName === '/meals'
        ? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
        : `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
      setLoading(true);
      const response = await fetch(apiUrl);
      const data = await response.json();
      setDataApi(pathName === '/meals' ? { meals: data.meals } : { drinks: data.drinks });
      setSelectedCategory(category);
      setLoading(false);
    }
  };
  const newArr = [...dataApi[pathNameSplit] ? dataApi[pathNameSplit] : []];
  const isGreaterThan12 = newArr?.length > maxLength
    ? newArr.splice(0, maxLength) : newArr;
  return (
    <>
      <Header />
      {
        Loading ? <p>Loading...</p> : (
          <section>
            {
              categories.map((category, index) => (
                <div key={ index }>
                  <button
                    type="button"
                    data-testid={ `${category}-category-filter` }
                    onClick={ () => handleChangeCategory(category) }
                  >
                    {category}
                  </button>
                </div>
              ))
            }
            <button
              type="button"
              data-testid="All-category-filter"
              onClick={ () => handleChangeCategory('all') }
            >
              All
            </button>
            {
              isGreaterThan12?.map((recipe, index) => (
                <Link
                  key={ recipe.idMeal || recipe.idDrink }
                  to={ `${pathName}/${recipe.idMeal || recipe.idDrink}` }
                >
                  <div
                    data-testid={ `${index}-recipe-card` }
                  >
                    <img
                      src={ recipe.strMealThumb || recipe.strDrinkThumb }
                      alt={ recipe.strMeal || recipe.strDrink }
                      data-testid={ `${index}-card-img` }
                      style={ { width: '200px' } }
                    />
                    <p data-testid={ `${index}-horizontal-top-text` }>
                      { recipe.strAlcoholic || recipe.strCategory }
                    </p>
                    <p data-testid={ `${index}-card-name` }>
                      { recipe.strMeal || recipe.strDrink }
                    </p>
                  </div>
                </Link>
              ))
            }
          </section>
        )
      }
      <Footer />
    </>
  );
}

export default Recipes;
