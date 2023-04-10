import React from 'react';
import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Recipes from './pages/Recipes';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import RecipeDetails from './pages/RecipeDetails';
import RecipeInProgress from './pages/RecipeInProgress';

import RecipeProvider from './provider/RecipeProvider';
import HeaderProvider from './provider/HeaderProvider';
import SearchBarProvider from './provider/SearchBarProvider';

function App() {
  return (
    <SearchBarProvider>
      <RecipeProvider>
        <HeaderProvider>
          <Switch>
            <Route exact path="/profile" component={ Profile } />
            <Route exact path="/meals" component={ Recipes } />
            <Route exact path="/drinks" component={ Recipes } />
            <Route exact path="/meals/:id" component={ RecipeDetails } />
            <Route exact path="/drinks/:id" component={ RecipeDetails } />
            <Route exact path="/meals/:id/in-progress" component={ RecipeInProgress } />
            <Route exact path="/drinks/:id/in-progress" component={ RecipeInProgress } />
            <Route exact path="/done-recipes" component={ DoneRecipes } />
            <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
            <Route exact path="/" component={ Login } />
          </Switch>
        </HeaderProvider>
      </RecipeProvider>
    </SearchBarProvider>
  );
}

export default App;
