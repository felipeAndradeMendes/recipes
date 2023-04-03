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
    <div>
      <input
        type="text"
        data-testid="search-input"
        name="searchText"
        value={ nameSearch }
        onChange={ handleChange }
      />
      <label htmlFor="ingredient">
        Ingredient
        <input
          type="radio"
          name="searchType"
          id="i"
          data-testid="ingredient-search-radio"
          value="ingredient"
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="name">
        Name
        <input
          type="radio"
          name="searchType"
          id="s"
          data-testid="name-search-radio"
          value="name"
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="first-letter">
        First letter
        <input
          type="radio"
          name="searchType"
          id="f"
          data-testid="first-letter-search-radio"
          value="first-letter"
          onChange={ (target) => handleChange(target) }
        />
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleClick }
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
