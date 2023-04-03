import React from 'react';
import './App.css';
// import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router-dom';
// import Login from './pages/Login';
import Header from './components/Header';
import Profile from './pages/Profile';

function App() {
  return (
    <>
      <Header />
      {/* <div className="meals">
        <span className="logo">TRYBE</span>
        <object
          className="rocksGlass"
          type="image/svg+xml"
          data={ rockGlass }
        >
          Glass
        </object>
      </div> */}
      <Switch>
        <Route path="/profile" component={ Profile } />
        {/* <Route exact path="/" component={ Login } /> */}
      </Switch>

    </>
  );
}

export default App;
