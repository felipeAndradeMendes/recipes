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
      className="bg-green-600 rounded-md p-3 flex flex-col
      items-center justify-center w-[360px]"
    >
      <div className=" flex justify-center">
        <input
          className="box-border rounded-xl border-gray-900 border"
          type="text"
          data-testid="search-input"
          name="searchText"
          value={ nameSearch }
          onChange={ handleChange }
        />
      </div>
      <div className="flex gap-2">
        <label htmlFor="ingredient" className=" flex text-gray-900">
          Ingredient
          <input
            className="ml-1 px-4 py-2 border rounded-md w-full text-gray-700"
            type="radio"
            name="searchType"
            id="i"
            data-testid="ingredient-search-radio"
            value="ingredient"
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="name" className=" flex text-gray-900">
          Name
          <input
            className="ml-1 px-4 py-2 border rounded-md w-full text-gray-700"
            type="radio"
            name="searchType"
            id="s"
            data-testid="name-search-radio"
            value="name"
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="first-letter" className=" flex text-gray-900">
          First letter
          <input
            className="ml-1 px-4 py-2 border rounded-md text-gray-700"
            type="radio"
            name="searchType"
            id="f"
            data-testid="first-letter-search-radio"
            value="first-letter"
            onChange={ (target) => handleChange(target) }
          />
        </label>
      </div>
      <button
        className="text-gray-900 bg-gray-400 hover:bg-gray-300 font-bold rounded-md w-64"
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
