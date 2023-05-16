/* eslint-disable react/jsx-max-depth */
import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { HiCheck } from 'react-icons/hi';
import { GrFavorite } from 'react-icons/gr';
import { SlLogout } from 'react-icons/sl';
import { IoIosArrowForward } from 'react-icons/io';
import Header from '../components/Header';
import Footer from '../components/Footer';
import headerContext from '../context/headerContext';

// push

const done = 'done-recipes';
const favorite = 'favorite-recipes';
const logout = '/';

function Profile() {
  const [user] = useState(JSON.parse(localStorage.getItem('user')) || 'User');
  const { setPageName } = useContext(headerContext);

  const history = useHistory();

  const handleClick = (name) => {
    setPageName('profile');
    switch (name) {
    case done:
      history.push(done);
      break;
    case favorite:
      history.push(favorite);
      break;
    default:
      history.push(logout);
      localStorage.clear();
      break;
    }
  };

  return (
    <div className="h-[640px] bg-[#FFFFFF]">
      <Header />
      <div className="max-w-[320px] m-auto">
        <p
          className="text-xl mt-4 mb-4"
          data-testid="profile-email"
        >
          {user.email}

        </p>
        <div className="flex flex-col">
          <button
            className="
            flex justify-between items-center
            w-full
            h-16 border-b-[1px]"
            data-testid="profile-done-btn"
            name={ done }
            onClick={ () => handleClick('done-recipes') }
          >
            <div className="flex items-center">
              <HiCheck
                className="ml-[4px] mr-[14px]"
                style={ { width: '20px', height: '20px' } }
              />
              Done Recipes
            </div>
            <IoIosArrowForward className="mr-2" />
          </button>

          <button
            type="button"
            className="
            flex justify-between items-center
            w-full
            h-16 border-b-[1px]"
            data-testid="profile-favorite-btn"
            name={ favorite }
            onClick={ () => handleClick('favorite-recipes') }
          >
            <div className="flex items-center">
              <GrFavorite
                className="ml-[4px] mr-[14px]"
                style={ { width: '20px', height: '20px' } }
              />
              Favorite Recipes
            </div>
            <IoIosArrowForward className="mr-2" />
          </button>
          <button
            className="
            flex justify-between items-center
            w-full
            h-16 border-b-[1px]"
            data-testid="profile-logout-btn"
            name={ logout }
            onClick={ () => handleClick('/') }
          >
            <div className="flex items-center">
              <SlLogout
                className="ml-[4px] mr-[14px]"
                style={ { width: '20px', height: '20px' } }
              />
              Logout
            </div>
            <IoIosArrowForward className="mr-2" />
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;

// shadow-[0px_1px_2px_-0px_rgba(0,0,0,0.05)]
// shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),_0px_2px_4px_-1px_rgba(0,0,0,0.06)];
// shadow hover:shadow-[rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px]
