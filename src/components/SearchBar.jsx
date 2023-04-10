import React, { useContext } from 'react';
import useFetch from '../hooks/useFetch';
import SearchBarContext from '../context/SearchBarContext';

function SearchBar() {
  const [makeFetch] = useFetch();

  const { optionSearch, setOptionSearch,
    nameSearch, setNameSearch } = useContext(SearchBarContext);

  const goFetch = async () => {
    await makeFetch(nameSearch, optionSearch.id);
  };

  const handleChange = ({ target: { value, id, type } }) => {
    if (type === 'text') {
      return setNameSearch(value);
    }
    return setOptionSearch(
      { ...optionSearch,
        option: value,
        id,
      },
    );
  };

  const handleClick = async () => {
    await goFetch();
  };

  return (
    <div
      className="bg-green-600 rounded-md"
    >
      <input
        className="box-border rounded-xl border-gray-900 border mr-10"
        type="text"
        data-testid="search-input"
        name="searchText"
        value={ nameSearch }
        onChange={ handleChange }
      />
      <label htmlFor="ingredient" className="container text-gray-900 mr-10">
        Ingredient
        <input
          className="ml-1"
          type="radio"
          name="searchType"
          id="i"
          data-testid="ingredient-search-radio"
          value="ingredient"
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="name" className="container text-gray-900 mr-10">
        Name
        <input
          className="ml-1"
          type="radio"
          name="searchType"
          id="s"
          data-testid="name-search-radio"
          value="name"
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="first-letter" className="container text-gray-900 mr-10">
        First letter
        <input
          className="ml-1"
          type="radio"
          name="searchType"
          id="f"
          data-testid="first-letter-search-radio"
          value="first-letter"
          onChange={ (target) => handleChange(target) }
        />
      </label>
      <button
        className="text-gray-900 container bg-gray-400 font-bold
        w-207.54 h-25 left-73.67 top-243 rounded-md "
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => handleClick() }
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
