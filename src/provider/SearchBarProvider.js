import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import SearchBarContext from '../context/SearchBarContext';

function SearchBarProvider({ children }) {
  const [optionSearch, setOptionSearch] = useState({});
  const [nameSearch, setNameSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [dataApi, setDataApi] = useState({
    meals: [],
    drinks: [],
  });

  const values = useMemo(() => ({
    optionSearch,
    setOptionSearch,
    nameSearch,
    setNameSearch,
    dataApi,
    setDataApi,
    isLoading,
    setIsLoading,
  }), [optionSearch, nameSearch, dataApi, isLoading]);

  return (
    <SearchBarContext.Provider
      value={ values }
    >
      { children }
    </SearchBarContext.Provider>
  );
}

SearchBarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SearchBarProvider;
