import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import Header from '../components/Header';
import HeaderProvider from '../provider/HeaderProvider';
import SearchBarProvider from '../provider/SearchBarProvider';

describe('Testes do Componente Header', () => {
  const profileLinkBtn = 'profile-top-btn';
  const searchTopBtn = 'search-top-btn';
  test('Os componentes são renderizados', () => {
    const history = createMemoryHistory();
    history.push('/meals');
    render(
      <Router history={ history }>
        <SearchBarProvider>
          <HeaderProvider>
            <Header />
          </HeaderProvider>
        </SearchBarProvider>
      </Router>,
    );

    // act(() => {
    //   history.push('/meals');
    // });
    expect(history.location.pathname).toBe('/meals');

    screen.logTestingPlaygroundURL();

    const profileIcon = screen.getByTestId(profileLinkBtn);
    const searchIcon = screen.getByTestId(searchTopBtn);
    expect(profileIcon).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();

    userEvent.click(searchIcon);
    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();

    // expect(screen.getByText(/barra de busca/i)).toBeInTheDocument();
    // userEvent.click(searchIcon);
    // expect(screen.queryByText(/barra de busca/i)).not.toBeInTheDocument();

    // userEvent.click(profileIcon);
    // expect(screen.getByText(/profile/i)).toBeInTheDocument();
  });

  test('Os componentes são renderizados em /drinks', () => {
    const history = createMemoryHistory();
    history.push('/drinks');
    render(
      <Router history={ history }>
        <SearchBarProvider>
          <HeaderProvider>
            <Header />
          </HeaderProvider>
        </SearchBarProvider>
      </Router>,
    );

    expect(history.location.pathname).toBe('/drinks');

    screen.logTestingPlaygroundURL();

    const profileIcon = screen.getByTestId(profileLinkBtn);
    const searchIcon = screen.getByTestId(searchTopBtn);
    expect(profileIcon).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();

    userEvent.click(searchIcon);
    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
  });

  test('Os componentes são renderizados em /profile', () => {
    const history = createMemoryHistory();
    history.push('/profile');
    render(
      <Router history={ history }>
        <SearchBarProvider>
          <HeaderProvider>
            <Header />
          </HeaderProvider>
        </SearchBarProvider>
      </Router>,
    );

    expect(history.location.pathname).toBe('/profile');

    screen.logTestingPlaygroundURL();

    const profileIcon = screen.getByTestId(profileLinkBtn);
    const searchIcon = screen.queryByTestId(searchTopBtn);
    expect(profileIcon).toBeInTheDocument();
    expect(searchIcon).not.toBeInTheDocument();
  });

  test('Os componentes são renderizados em /done-recipes', () => {
    const history = createMemoryHistory();
    history.push('/done-recipes');
    render(
      <Router history={ history }>
        <SearchBarProvider>
          <HeaderProvider>
            <Header />
          </HeaderProvider>
        </SearchBarProvider>
      </Router>,
    );

    expect(history.location.pathname).toBe('/done-recipes');

    screen.logTestingPlaygroundURL();

    const profileIcon = screen.getByTestId(profileLinkBtn);
    const searchIcon = screen.queryByTestId(searchTopBtn);
    expect(profileIcon).toBeInTheDocument();
    expect(searchIcon).not.toBeInTheDocument();
  });

  test('Os componentes são renderizados em /favorite-recipes', () => {
    const history = createMemoryHistory();
    history.push('/favorite-recipes');
    render(
      <Router history={ history }>
        <SearchBarProvider>
          <HeaderProvider>
            <Header />
          </HeaderProvider>
        </SearchBarProvider>
      </Router>,
    );

    expect(history.location.pathname).toBe('/favorite-recipes');

    screen.logTestingPlaygroundURL();

    const profileIcon = screen.getByTestId(profileLinkBtn);
    const searchIcon = screen.queryByTestId(searchTopBtn);
    expect(profileIcon).toBeInTheDocument();
    expect(searchIcon).not.toBeInTheDocument();

    userEvent.click(profileIcon);
    expect(history.location.pathname).toBe('/profile');
  });
});
