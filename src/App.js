import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router-dom';
import Profile from './pages/Profile';
import Login from './pages/Login';
import SearchBarProvider from './context/SearchBarProvider';

function App() {
  return (
    <SearchBarProvider>
      <Switch>
        <Route path="/profile" component={ Profile } />
        <Route exact path="/" component={ Login } />
      </Switch>
    </SearchBarProvider>
  );
}

export default App;
