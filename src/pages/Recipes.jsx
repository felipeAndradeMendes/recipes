import React, { useContext, useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Header from '../components/Header';
import SearchBarContext from '../context/SearchBarContext';
import Footer from '../components/Footer';

function Recipes() {
  const { dataApi, isLoading, setDataApi, setIsLoading } = useContext(SearchBarContext);
  const [categories, setCategories] = useState([]);
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
        setIsLoading(false);
      } else {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        const data = await response.json();
        setDataApi({ drinks: data.drinks });
        setIsLoading(false);
      }
    };
    fetchApi();
  }, [pathName, setDataApi, setIsLoading]);

  const handleChangeCategory = async (category) => {
    if (category === selectedCategory || category === '') {
      const url = pathName === '/meals'
        ? 'https://www.themealdb.com/api/json/v1/1/search.php?s='
        : 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const response = await fetch(url);
      const data = await response.json();
      setDataApi({ meals: data.meals, drinks: data.drinks });
    } else {
      const apiUrl = pathName === '/meals'
        ? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
        : `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      setDataApi(pathName === '/meals' ? { meals: data.meals } : { drinks: data.drinks });
    }
    setSelectedCategory(category);
  };
  console.log(dataApi[pathNameSplit]?.length);
  const isGreaterThan12 = dataApi[pathNameSplit]?.length > maxLength
    ? dataApi[pathNameSplit].splice(0, maxLength) : dataApi[pathNameSplit];

  return (
    <>
      <Header />
      {
        isLoading ? <p>Loading...</p> : (
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
              onClick={ () => handleChangeCategory('') }
            >
              All
            </button>
            {
              isGreaterThan12?.map((recipe, index) => (
                <Link
                  key={ recipe.idMeal || recipe.idDrink }
                  to={ `${pathName}/${recipe.idMeal || recipe.idDrink}` }
                >
                  {/* {console.log(pathName, recipe.idMeal, recipe.idDrink)} */}
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
