import React from 'react';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import HeaderProvider from '../provider/HeaderProvider';
import App from '../App';
import SearchBarProvider from '../provider/SearchBarProvider';

describe('Testes da página de Perfil', () => {
  test('Elementos renderizam corretamente', () => {
    const history = createMemoryHistory();
    history.push('/profile');
    render(
      <Router history={ history }>
        <SearchBarProvider>
          <HeaderProvider>
            <App />
          </HeaderProvider>
        </SearchBarProvider>
      </Router>,
    );
    screen.logTestingPlaygroundURL();
    expect(history.location.pathname).toBe('/profile');

    const btnDoneRecipes = screen.getByRole('button', { name: /Done Recipes/i });
    const btnFavoriteRecipes = screen.getByRole('button', { name: /Favorite Recipes/i });
    const btnLogout = screen.getByRole('button', { name: /Logout/i });
    expect(btnDoneRecipes).toBeInTheDocument();
    expect(btnFavoriteRecipes).toBeInTheDocument();
    expect(btnLogout).toBeInTheDocument();
  });

  test('Clicar no botão Done Recipes leva para a respectiva página', () => {
    const history = createMemoryHistory();
    history.push('/profile');
    render(
      <Router history={ history }>
        <SearchBarProvider>
          <HeaderProvider>
            <App />
          </HeaderProvider>
        </SearchBarProvider>
      </Router>,
    );
    screen.logTestingPlaygroundURL();
    expect(history.location.pathname).toBe('/profile');

    const btnDoneRecipes = screen.getByRole('button', { name: /Done Recipes/i });
    expect(btnDoneRecipes).toBeInTheDocument();

    userEvent.click(btnDoneRecipes);
    expect(history.location.pathname).toBe('/done-recipes');
  });

  test('Clicar no botão Favorite Recipes leva para a respectiva página', () => {
    const history = createMemoryHistory();
    history.push('/profile');
    render(
      <Router history={ history }>
        <SearchBarProvider>
          <HeaderProvider>
            <App />
          </HeaderProvider>
        </SearchBarProvider>
      </Router>,
    );
    screen.logTestingPlaygroundURL();
    expect(history.location.pathname).toBe('/profile');

    const btnFavoriteRecipes = screen.getByRole('button', { name: /Favorite Recipes/i });
    expect(btnFavoriteRecipes).toBeInTheDocument();

    userEvent.click(btnFavoriteRecipes);
    expect(history.location.pathname).toBe('/favorite-recipes');
  });

  test('Clicar no botão Logout leva para a pagina de login', () => {
    const history = createMemoryHistory();
    history.push('/profile');
    render(
      <Router history={ history }>
        <SearchBarProvider>
          <HeaderProvider>
            <App />
          </HeaderProvider>
        </SearchBarProvider>
      </Router>,
    );
    screen.logTestingPlaygroundURL();
    expect(history.location.pathname).toBe('/profile');

    const btnLogout = screen.getByRole('button', { name: /Logout/i });
    expect(btnLogout).toBeInTheDocument();
    userEvent.click(btnLogout);

    expect(history.location.pathname).toBe('/');
  });
});
