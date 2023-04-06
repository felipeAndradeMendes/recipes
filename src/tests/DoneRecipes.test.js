import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import renderRouter from '../helpers/helpers';
import HeaderProvider from '../provider/HeaderProvider';
import App from '../App';
import SearchBarProvider from '../provider/SearchBarProvider';
import DoneRecipes from '../pages/DoneRecipes';
import Header from '../components/Header';
import doneRecipesArray from '../helpers/LocalStorageTest';

const setLocalStorage = () => {
  window.localStorage.setItem('doneRecipes', JSON.stringify(doneRecipesArray));
};

const route = '/done-recipes';

describe('Testa a pagina de receitas feitas', () => {
  beforeEach(() => {
    setLocalStorage();
  });

  test('Deve ser renderizado os cards de receitas', () => {
    const { history } = renderRouter(<App />);

    act(() => {
      history.push(route);
    });

    expect(screen.getByRole('button', { name: /all/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /meals/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /drinks/i })).toBeInTheDocument();
  });

  test('Botões renderizam e filtram corretamente', () => {
    const { history } = renderRouter(<App />);

    act(() => {
      history.push(route);
    });
    const btnAll = screen.getByRole('button', { name: /all/i });
    const btnMeals = screen.getByRole('button', { name: /meals/i });
    const btnDrinks = screen.getByRole('button', { name: /drinks/i });
    const btnShare = screen.getByTestId('0-horizontal-share-btn');
    expect(screen.getByText(/Receitão Xablau/i)).toBeInTheDocument();
    expect(screen.getByText(/Receitão sinistro/i)).toBeInTheDocument();

    userEvent.click(btnAll);
    expect(screen.getByText(/Receitão Xablau/i)).toBeInTheDocument();
    expect(screen.getByText(/Receitão sinistro/i)).toBeInTheDocument();

    userEvent.click(btnMeals);
    expect(screen.getByText(/Receitão Xablau/i)).toBeInTheDocument();
    expect(screen.queryByText(/Receitão sinistro/i)).not.toBeInTheDocument();

    userEvent.click(btnDrinks);
    expect(screen.queryByText(/Receitão Xablau/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Receitão sinistro/i)).toBeInTheDocument();

    userEvent.click(btnShare);
    expect(screen.getByText(/Link copied!/i)).toBeInTheDocument();

  });



  // test('Botões renderizam e filtram corretamente', async () => {
  //   const history = createMemoryHistory();
  //   history.push(route);

  //   // const localStorageMock = {
  //   //   getItem: jest.fn(),
  //   //   setItem: jest.fn(),
  //   //   removeItem: jest.fn(),
  //   //   clear: jest.fn(),
  //   // };
  //   localStorage.setItem('doneRecipes', JSON.stringify(doneRecipesArray));

  //   // localStorageMock.setItem('doneRecipes', JSON.stringify(doneRecipesArray));

  //   render(
  //     <Router history={ history }>
  //       <SearchBarProvider>
  //         <HeaderProvider>
  //           <DoneRecipes />
  //         </HeaderProvider>
  //       </SearchBarProvider>
  //     </Router>,
  //   );

  //   const btnAll = screen.getByRole('button', { name: /all/i });
  //   const btnMeals = screen.getByRole('button', { name: /meals/i });
  //   const btnDrinks = screen.getByRole('button', { name: /drinks/i });
  //   const btnShare = screen.getByTestId('0-horizontal-share-btn');
  //   expect(btnAll).toBeInTheDocument();
  //   expect(btnMeals).toBeInTheDocument();
  //   expect(btnDrinks).toBeInTheDocument();
  //   expect(btnShare).toBeInTheDocument();
  //   // localStorage.setItem('doneRecipes', JSON.stringify(doneRecipesArray));

  //   const local = localStorage.getItem('doneRecipes', JSON.stringify(doneRecipesArray));
  //   console.log('LOCAL STORAGE:', local);

  //   userEvent.click(btnAll);
  //   // userEvent.click(btnMeals);
  //   // userEvent.click(btnDrinks);
  //   // userEvent.click(btnShare);
  //   // expect(screen.queryByText(/Receitão sinistro/i)).not.toBeInTheDocument();

  //   screen.logTestingPlaygroundURL();
  //   expect(history.location.pathname).toBe('/done-recipes');
  // });
});
