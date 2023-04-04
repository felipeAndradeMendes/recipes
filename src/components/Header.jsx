import { Link, useHistory } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import headerContext from '../context/headerContext';
import SearchBar from './SearchBar';

function Header() {
  const { setPageName } = useContext(headerContext);

  const [showSearch, setShowSearch] = useState(false);
  const history = useHistory();
  const pathName = history.location.pathname;

  const [title, setTitle] = useState(null);

  useEffect(() => {
    switch (pathName) {
    case '/meals':
      setTitle('Meals');
      break;
    case '/drinks':
      setTitle('Drinks');
      break;
    case '/profile':
      setTitle('Profile');
      break;
    case '/done-recipes':
      setTitle('Done Recipes');
      break;
    case '/favorite-recipes':
      setTitle('Favorite Recipes');
      break;
    default: break;
    }
  }, [pathName]);

  return (
    <section>
      <h2 data-testid="page-title">
        { title }
      </h2>
      {
        pathName === '/meals' || pathName === '/drinks'
          ? (
            <button
              name="start-search"
              type="button"
              onClick={ () => setShowSearch(!showSearch) }
            >
              <img
                src={ searchIcon }
                alt="Search Icon"
                data-testid="search-top-btn"
              />
            </button>
          ) : null
      }
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
      {showSearch && (
        <div>
          <SearchBar />
        </div>
      )}
    </section>

  );
}

export default Header;
