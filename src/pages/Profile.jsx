import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { MdDoneOutline } from 'react-icons/md';
import { GrFavorite } from 'react-icons/gr';
import { SlLogout } from 'react-icons/sl';
import Header from '../components/Header';
import Footer from '../components/Footer';

// push

const done = 'done-recipes';
const favorite = 'favorite-recipes';
const logout = '/';

function Profile() {
  const [user] = useState(JSON.parse(localStorage.getItem('user')) || 'User');

  const history = useHistory();

  const handleClick = (name) => {
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
    <div className="h-[640px] bg-[#efefef]">
      <Header />
      <div>
        <div className="mb-10">
          <p
            className="text-xl font-mono text-center my-5"
            data-testid="profile-email"
          >
            {user.email}

          </p>
        </div>
        <div className="flex flex-col gap-3">
          <button
            className="
            flex justify-start items-center
            shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1)]
            hover:shadow-lg
            transition-shadow
            w-full
            h-16
            text-2xl
            rounded-xl
            "
            style={ { color: '#444444', backgroundColor: '#d5f7e9' } }
            data-testid="profile-done-btn"
            name={ done }
            onClick={ ({ target: { name } }) => handleClick(name) }
          >
            <MdDoneOutline className="mx-7" />
            Done Recipes
          </button>

          <button
            className="
            flex justify-start items-center
            shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1)]
            hover:shadow-lg
            transition-shadow
            w-full
            h-16
            text-2xl
            rounded-xl
            "
            style={ { color: '#444444', backgroundColor: '#d5f7e9' } }
            data-testid="profile-favorite-btn"
            name={ favorite }
            onClick={ ({ target: { name } }) => handleClick(name) }
          >
            <GrFavorite className="mx-7" />
            Favorite Recipes
          </button>
          <button
            className="
              flex justify-start items-center
              shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1)]
              hover:shadow-lg
              transition-shadow
              w-full
              h-16
              text-2xl
              rounded-xl
              "
            style={ { color: '#444444', backgroundColor: '#d5f7e9' } }
            data-testid="profile-logout-btn"
            name={ logout }
            onClick={ ({ target: { name } }) => handleClick(name) }
          >
            <SlLogout className="mx-7" />
            Logout
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
