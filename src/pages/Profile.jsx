import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
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
    case logout:
      history.push(logout);
      localStorage.clear();
      break;
    default: break;
    }
  };

  return (
    <>
      <Header />
      <p data-testid="profile-email">{user.email}</p>
      <button
        data-testid="profile-done-btn"
        name={ done }
        onClick={ ({ target: { name } }) => handleClick(name) }
      >
        Done Recipes
      </button>
      <button
        data-testid="profile-favorite-btn"
        name={ favorite }
        onClick={ ({ target: { name } }) => handleClick(name) }
      >
        Favorite Recipes
      </button>
      <button
        data-testid="profile-logout-btn"
        name={ logout }
        onClick={ ({ target: { name } }) => handleClick(name) }
      >
        Logout
      </button>
      <Footer />
    </>
  );
}

export default Profile;
