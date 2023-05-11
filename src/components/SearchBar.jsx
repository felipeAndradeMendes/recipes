import React, { useContext } from 'react';
import { BiSearch } from 'react-icons/bi';
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
      className="bg-[#FFFFFF] flex flex-col
      items-start justify-center mb-4 mt-2 max-w-[320px]"
    >
      <p className="w-[300px] text-[#0DC41F] font-bold ">Hello,</p>
      <p className="w-[300px] mb-1 text-[#888888]">What you want to cook today?</p>
      <div className=" flex justify-center">
        <input
          placeholder="Search Recipes"
          className="rounded-l-[6px] bg-[#F2F2F2] p-2 pl-2 pr-[72px]
           placeholder-[#bdbdbd] mb-1 mt-2"
          type="text"
          data-testid="search-input"
          name="searchText"
          value={ nameSearch }
          onChange={ handleChange }
        />
        <button
          className="bg-[#80E78B] box-border rounded-r-[6px] p-2 pr-3 pl-3 mb-1 mt-2"
          type="button"
          data-testid="exec-search-btn"
          onClick={ () => handleClick() }
        >
          <BiSearch />
        </button>
      </div>
      <div className="flex justify-between w-[290px] mt-2">
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
    </div>
  );
}

export default SearchBar;
