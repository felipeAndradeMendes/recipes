import React from 'react';

function SearchBar() {
  return (
    <div>
      <input
        type="text"
        data-testid="search-input"
        name="searchInput"
        value={ searchInput }
        onChange={ handleChange }
      />
      <label htmlFor="ingredient">
        Ingredient
        <input
          type="radio"
          name="searchType"
          id="ingredient"
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
          id="name"
          data-testid="name-search-radio"
          value="name"
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="first-letter">
        First Letter
        <input
          type="radio"
          name="searchType"
          id="first-letter"
          data-testid="first-letter-search-radio"
          value="first-letter"
          onChange={ handleChange }
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
