import { Link, useHistory } from 'react-router-dom';
import { useContext, useState } from 'react';
import { RxPerson } from 'react-icons/rx';
import { BiSearch } from 'react-icons/bi';
import { IoIosArrowBack } from 'react-icons/io';
// import profileIcon from '../images/profileIcon.svg';
// import searchIcon from '../images/searchIcon.svg';
import headerContext from '../context/headerContext';
import SearchBar from './SearchBar';

function Header() {
  const { setPageName, pageName } = useContext(headerContext);

  const [showSearch, setShowSearch] = useState(false);
  const history = useHistory();
  const pathName = history.location.pathname;

  return (
    <section
      className="
        flex flex-wrap w-full m-auto bg-[#FFFFFF] justify-center"
    >
      <div
        className="flex justify-between w-[320px] m-auto mb-4 mt-6"
      >
        {
          pathName === '/meals' || pathName === '/drinks'
            ? (
              <Link
                to="/profile"
                onClick={ () => setPageName(history.location.pathname) }
              >
                <RxPerson
                  style={ { width: '24', height: '24px', color: '#666666' } }
                  data-testid="profile-top-btn"
                />
              </Link>
            )
            : (
              <Link
                to={ history.location.pathname === '/profile' ? '/meals' : pageName }
                onClick={ () => setPageName(history.location.pathname) }
              >
                <IoIosArrowBack
                  style={ { width: '24', height: '24px', color: '#666666' } }
                  data-testid="profile-top-btn"
                />
              </Link>
            )
        }
        {
          pathName === '/meals' || pathName === '/drinks'
            ? (
              <button
                name="start-search"
                type="button"
                onClick={ () => setShowSearch(!showSearch) }
              >
                <BiSearch
                  data-testid="search-top-btn"
                  style={ { width: '24px', height: '24px', color: '#666666' } }
                />
              </button>
            ) : null
        }
      </div>
      <div>
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
