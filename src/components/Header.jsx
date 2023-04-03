import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import headerContext from '../context/headerContext';

function Header() {
  const { pageName, setPageName } = useContext(headerContext);

  const [showSearch, setShowSearch] = useState(false);

  return (
    <section>
      <h1>RECIPES App</h1>
      <button
        type="button"
        onClick={ () => setShowSearch(!showSearch) }
      >
        <img
          src={ searchIcon }
          alt="Search Icon"
          data-testid="search-top-btn"
        />
      </button>

      <Link
        to="/profile"
        onClick={ () => setPageName('Profile') }
      >
        <img
          src={ profileIcon }
          alt="Profile icon"
          data-testid="profile-top-btn"
        />
      </Link>
      <h2 data-testid="page-title">{pageName}</h2>
      {showSearch && (
        <h3>BARRA DE BUSCA</h3>
      )}
    </section>

  );
}

export default Header;
