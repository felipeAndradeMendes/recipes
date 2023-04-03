import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import SearchBarContext from './SearchBarContext';

function SearchBarProvider({ children }) {
  const [optionSearch, setOptionSearch] = useState({});
  const [nameSearch, setNameSearch] = useState('');
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
  }), [optionSearch, nameSearch, dataApi]);

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
