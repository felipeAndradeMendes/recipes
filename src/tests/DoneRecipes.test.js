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

describe('Testa a pagina de receitas feitas', () => {
  // test('Deve ser renderizado os cards de receitas', () => {
  //   const { history } = renderRouter(<App />);

  //   act(() => {
  //     history.push('/done-recipes');
  //   });

  //   expect(screen.getByRole('button', { name: /all/i })).toBeInTheDocument();
  //   expect(screen.getByRole('button', { name: /meals/i })).toBeInTheDocument();
  //   expect(screen.getByRole('button', { name: /drinks/i })).toBeInTheDocument();
  // });

  test('Botões renderizam e filtram corretamente', () => {
    const history = createMemoryHistory();
    history.push('/done-recipes');
    // const doneRecipesArray = [{
    //   id: 0,
    //   type: 'meal',
    //   nationality: 'brasileira',
    //   category: 'chicken',
    //   alcoholicOrNot: '',
    //   name: 'Receitão Xablau',
    //   image: 'https://assets.epicurious.com/photos/62f16ed5fe4be95d5a460eed/1:1/w_960,c_limit/RoastChicken_RECIPE_080420_37993.jpg',
    //   doneDate: '04/04/2023',
    //   tags: ['frango', 'comida'],
    // },
    // {
    //   id: 1,
    //   type: 'drink',
    //   nationality: 'americana',
    //   category: 'beef',
    //   alcoholicOrNot: '',
    //   name: 'Receitão sinistro',
    //   image: 'https://cdn.britannica.com/18/137318-050-29F7072E/rooster-Rhode-Island-Red-roosters-chicken-domestication.jpg?w=400&h=300&c=crop',
    //   doneDate: '05/04/2023',
    //   tags: ['galo', 'rango'],
    // }];

    const localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
    };
    global.localStorage = localStorageMock;

    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipesArray));
    render(
      <Router history={ history }>
        <SearchBarProvider>
          <HeaderProvider>
            <DoneRecipes />
          </HeaderProvider>
        </SearchBarProvider>
      </Router>,
    );

    const doneRecipesFromLocalStorage = JSON.parse(localStorage.getItem('doneRecipes'));
    console.log(doneRecipesFromLocalStorage);

    const btnAll = screen.getByRole('button', { name: /all/i });
    const btnMeals = screen.getByRole('button', { name: /meals/i });
    const btnDrinks = screen.getByRole('button', { name: /drinks/i });
    expect(btnAll).toBeInTheDocument();
    expect(btnMeals).toBeInTheDocument();
    expect(btnDrinks).toBeInTheDocument();

    userEvent.click(btnMeals);
    screen.logTestingPlaygroundURL();
    expect(screen.queryByText(/Receitão sinistro/i)).not.toBeInTheDocument();

    // expect(localStorageMock.setItem).toHaveBeenCalledTimes(1);
    // // expect(localStorageMock.getItem).toHaveBeenCalledWith('doneRecipes');
    // expect(localStorageMock.removeItem).toHaveBeenCalledTimes(0);
    expect(history.location.pathname).toBe('/done-recipes');
  });
});
