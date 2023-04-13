import React, { useContext, useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { TbMeat, TbIceCream } from 'react-icons/tb';
import { GiToaster, GiChickenOven, GiGoat, GiDrinkMe,
  GiChocolateBar } from 'react-icons/gi';
import { BiBorderAll } from 'react-icons/bi';
import { FaCocktail } from 'react-icons/fa';
import { GrStatusUnknown } from 'react-icons/gr';
import Header from '../components/Header';
import SearchBarContext from '../context/SearchBarContext';
import Footer from '../components/Footer';
import Loading from '../components/Loading';

function Recipes() {
  const { dataApi, setDataApi } = useContext(SearchBarContext);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const history = useHistory();
  const pathName = history.location.pathname;
  const pathNameSplit = pathName === '/meals' ? 'meals' : 'drinks';
  const maxLength = 12;

  useEffect(() => {
    if (pathName === '/meals') {
      const mealIcons = [
        { name: 'Beef',
          icon: <TbMeat
            tyle={ { width: '24px', height: '24px' } }
          /> },
        { name: 'Breakfast',
          icon: <GiToaster
            style={ { width: '24px', height: '24px' } }
          /> },
        { name: 'Chicken',
          icon: <GiChickenOven
            style={ { width: '24px', height: '24px' } }
          /> },
        { name: 'Dessert',
          icon: <TbIceCream
            style={ { width: '24px', height: '24px' } }
          /> },
        { name: 'Goat',
          icon: <GiGoat
            style={ { width: '24px', height: '24px' } }
          /> },
      ];
      setCategories(mealIcons);
    } else {
      const drinkIcon = [
        { name: 'Cocoa',
          icon: <GiChocolateBar
            style={ { width: '24px', height: '24px' } }
          /> },
        { name: 'Cocktail',
          icon: <FaCocktail
            style={ { width: '24px', height: '24px' } }
          /> },
        { name: 'Other',
          icon: <GrStatusUnknown
            style={ { width: '24px', height: '24px' } }
          /> },
        { name: 'Shake',
          icon: <GiDrinkMe
            style={ { width: '24px', height: '24px' } }
          /> },
      ];
      setCategories(drinkIcon);
    }
  }, [pathName]);

  useEffect(() => {
    const fetchApi = async () => {
      if (pathName === '/meals') {
        setLoading(true);
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        const data = await response.json();
        setDataApi({ meals: data.meals });
        setLoading(false);
      } else {
        setLoading(true);
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
      setLoading(false);
      const response = await fetch(url);
      const data = await response.json();
      setDataApi({ meals: data.meals, drinks: data.drinks });
      setLoading(false);
    } else {
      const apiUrl = pathName === '/meals'
        ? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
        : `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category === 'Other' ? 'Other / Unknown' : category}`;
      setLoading(false);
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
        loading ? <Loading /> : (
          <section className="pb-[4.5rem] pt-5">
            <div className="flex justify-around items-center pb-10">
              {
                categories.map((category, index) => (
                  <div
                    key={ category.name + index }
                    className="flex flex-col justify-center items-center"
                  >
                    <button
                      className="w-14 h-14 flex justify-center flex-col
                     items-center border-2 border-[#0a9b61] rounded-full
                      hover:bg-[#0a9b61] hover:text-white"
                      type="button"
                      data-testid={ `${category.name}-category-filter` }
                      onClick={ () => handleChangeCategory(category.name) }
                    >
                      {category.icon}
                    </button>
                    <p className="text-xs">{category.name}</p>
                  </div>
                ))
              }
              <div className="flex flex-col items-center">
                <button
                  type="button"
                  data-testid="All-category-filter"
                  onClick={ () => handleChangeCategory('all') }
                  className="w-14 h-14 flex justify-center flex-col
                     items-center border-2 border-[#0a9b61] rounded-full
                      hover:bg-[#0a9b61] hover:text-white"
                >
                  <BiBorderAll
                    style={ { width: '24px', height: '24px' } }
                  />
                </button>
                <p className="text-xs">All</p>
              </div>
            </div>
            <div className="flex flex-wrap justify-around gap-2">
              {
                isGreaterThan12?.map((recipe, index) => (
                  <Link
                    key={ recipe.idMeal || recipe.idDrink }
                    to={ `${pathName}/${recipe.idMeal || recipe.idDrink}` }
                    className="flex flex-col justify-center items-center w-[47%]"
                  >
                    <div
                      data-testid={ `${index}-recipe-card` }
                      className="border border-black rounded-md"
                    >
                      <img
                        src={ recipe.strMealThumb || recipe.strDrinkThumb }
                        alt={ recipe.strMeal || recipe.strDrink }
                        data-testid={ `${index}-card-img` }
                        className="rounded-md w-40 h-40 object-cover object-center"
                      />
                      <div className="p-1">
                        <p
                          data-testid={ `${index}-horizontal-top-text` }
                          className="pl-2 text-xs"
                        >
                          <span className="italic text-xs">Category: </span>
                          { selectedCategory || recipe.strCategory
                          || recipe.strAlcoholic }
                        </p>
                        <p
                          data-testid={ `${index}-card-name` }
                          className="pl-2 text-xs"
                        >
                          <span className="italic text-xs">Name: </span>
                          { recipe.strMeal || recipe.strDrink }
                        </p>
                      </div>
                    </div>
                  </Link>
                ))
              }
            </div>
          </section>
        )
      }
      <Footer />
    </>
  );
}

export default Recipes;
