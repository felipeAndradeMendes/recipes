import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import headerContext from '../context/headerContext';

function HeaderProvider({ children }) {
  const [pageName, setPageName] = useState(null);
  const memo = useMemo(() => ({
    pageName,
    setPageName,
  }), [pageName]);

  return (
    <headerContext.Provider value={ memo }>
      {children}
    </headerContext.Provider>
  );
}

HeaderProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default HeaderProvider;
