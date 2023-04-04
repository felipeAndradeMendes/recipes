import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import RecipeProvider from './provider/RecipeProvider';
import HeaderProvider from './provider/HeaderProvider';
import SearchBarProvider from './provider/SearchBarProvider';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <SearchBarProvider>
      <RecipeProvider>
        <HeaderProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </HeaderProvider>
      </RecipeProvider>
    </SearchBarProvider>,

  );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
