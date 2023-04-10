import { Link, useHistory } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { CiSearch } from 'react-icons/ci';
import { RxPerson } from 'react-icons/rx';
// import profileIcon from '../images/profileIcon.svg';
// import searchIcon from '../images/searchIcon.svg';
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
    <section
      className="
        flex flex-wrap
        shadow-[0px_0px_15px_-10px_rgba(0,0,0,0.5)]"
    >
      <div
        className="
          w-full
          flex justify-between
          px-3"
      >
        { /* NOME/LOGO APP */ }
        <h2
          className="
            max-w-max
            text-2xl font-sans
            p-3"
          data-testid="page-title"
        >
          { title }
        </h2>

        <div
          className="
            flex
            items-center
          "
        >
          { /* BOTÃO DE PESQUISA */ }
          {
            pathName === '/meals' || pathName === '/drinks'
              ? (
                <button
                  className="px-0.5 py-1"
                  name="start-search"
                  type="button"
                  onClick={ () => setShowSearch(!showSearch) }
                >
                  {/* <img
                    // src={ searchIcon }
                    src={ CiSearch }
                    alt="Search Icon"
                    data-testid="search-top-btn"
                  /> */}
                  <CiSearch
                    data-testid="search-top-btn"
                    style={ { width: '32px', height: '32px' } }
                  />
                </button>
              ) : null
          }

          { /* BOTÃO DE PERFIL */ }
          <Link
            className="px-5 py-1"
            to="/profile"
            onClick={ () => setPageName('Profile') }
          >
            {/* <img
              src={ profileIcon }
              alt="Profile icon"
              data-testid="profile-top-btn"
            /> */}
            <RxPerson
              style={ { width: '32', height: '32px' } }
              data-testid="profile-top-btn"
            />
          </Link>
        </div>
      </div>
      <div>
        { /* SEARCHBAR */ }
        {showSearch && (
          <div>
            <SearchBar />
          </div>
        )}
      </div>
    </section>

  );
}

export default Header;

// Green: #0a9b61
// Gray: #1d1d1d
// Ligth Gray: #c0c0c0
