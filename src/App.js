import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router-dom';
import Drinks from './pages/Drinks';
import Meals from './pages/Meals';
import Profile from './pages/Profile';
import Login from './pages/Login';
import SearchBarProvider from './context/SearchBarProvider';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';

function App() {
  return (
    <SearchBarProvider>
      <Switch>
        <Route path="/profile" component={ Profile } />
        <Route path="/meals" component={ Meals } />
        <Route path="/drinks" component={ Drinks } />
        <Route exact path="/" component={ Login } />
      </Switch>
    </SearchBarProvider>
  );
}

export default App;
