import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import App from '../pages/Recipes';
import SearchBarContext from '../context/SearchBarContext';
import HeaderProvider from '../provider/HeaderProvider';
import RecipeProvider from '../provider/RecipeProvider';
// push

const mockContext = {
  dataApi: {
    meals: [
      {
        idMeal: '1',
        strMeal: 'Meal 1',
        strCategory: 'Category 1',
      },
      {
        idMeal: '2',
        strMeal: 'Meal 2',
        strCategory: 'Category 2',
      },
    ],
    drinks: [
      {
        idDrink: '1',
        strDrink: 'Drink 1',
        strAlcoholic: 'Alcoholic 1',
      },
      {
        idDrink: '2',
        strDrink: 'Drink 2',
        strAlcoholic: 'Alcoholic 2',
      },
    ],
  },
  setDataApi: jest.fn(),
  setIsLoading: jest.fn(),
};

describe('Recipes component', () => {
  test('Testa se as categorias funcionam', async () => {
    const history = createMemoryHistory();
    const { getByRole } = render(
      <Router path="/drinks" history={ history }>
        <RecipeProvider>
          <HeaderProvider>
            <SearchBarContext.Provider value={ mockContext }>
              <App />
            </SearchBarContext.Provider>
          </HeaderProvider>
        </RecipeProvider>
      </Router>,
    );

    const ordinary = screen.getByRole('button', {
      name: /ordinary drink/i,
    });
    const cocktail = screen.getByRole('button', {
      name: /cocktail/i,
    });
    const milk = screen.getByRole('button', {
      name: /shake/i,
    });
    const cocoa = screen.getByRole('button', {
      name: /cocoa/i,
    });
    const all = screen.getByRole('button', {
      name: /all/i,
    });

    fireEvent.click(ordinary);
    waitFor(() => {
      const ordinaryDrink = screen.getByText('3-Mile Long Island Iced Tea');
      expect(ordinaryDrink).toBeInTheDocument();
    });

    fireEvent.click(cocktail);
    waitFor(() => {
      const cocktailDrink = screen.getByText('155 Belmont');
      expect(cocktailDrink).toBeInTheDocument();
    });

    fireEvent.click(milk);
    waitFor(() => {
      const milkDrink = screen.getByText('151 Florida Bushwacker');
      expect(milkDrink).toBeInTheDocument();
    });

    fireEvent.click(cocoa);
    waitFor(() => {
      const cocoaDrink = screen.getByText('Castillian Hot Chocolate');
      expect(cocoaDrink).toBeInTheDocument();
    });

    fireEvent.click(all);
    waitFor(() => {
      const allDrink = screen.getByText('GG');
      expect(allDrink).toBeInTheDocument();
    });

    const meals = getByRole('img', { name: /icone de talheres/i });
    fireEvent.click(meals);
  });
});
test('Testa se as categorias de meals funcionam', () => {
  const history = createMemoryHistory();
  render(
    <Router path="/meals" history={ history }>
      <RecipeProvider>
        <HeaderProvider>
          <SearchBarContext.Provider value={ mockContext }>
            <App />
          </SearchBarContext.Provider>
        </HeaderProvider>
      </RecipeProvider>
    </Router>,
  );
  history.push('/meals');
  expect(history.location.pathname).toBe('/meals');
  screen.logTestingPlaygroundURL();

  const all = screen.getByRole('button', {
    name: /all/i,
  });
  const beef = screen.getByRole('button', {
    name: /beef/i,
  });
  const Breakfast = screen.getByRole('button', {
    name: /breakfast/i,
  });
  const chicken = screen.getByRole('button', {
    name: /chicken/i,
  });
  const dessert = screen.getByRole('button', {
    name: /dessert/i,
  });
  const goat = screen.getByRole('button', {
    name: /goat/i,
  });

  fireEvent.click(beef);
  waitFor(() => {
    const beefMeal = screen.getByText('Beef and Mustard Pie');
    expect(beefMeal).toBeInTheDocument();
  });
  fireEvent.click(Breakfast);
  waitFor(() => {
    const breakfastMeal = screen.getByText('Breakfast Potatoes');
    expect(breakfastMeal).toBeInTheDocument();
  });
  fireEvent.click(chicken);
  waitFor(() => {
    const chickenMeal = screen.getByText('Ayam Percik');
    expect(chickenMeal).toBeInTheDocument();
  });
  fireEvent.click(dessert);
  waitFor(() => {
    const dessertMeal = screen.getByText('Apam balik');
    expect(dessertMeal).toBeInTheDocument();
  });
  fireEvent.click(goat);
  waitFor(() => {
    const goatMeal = screen.getByText('Mbuzi Choma (Roasted Goat)');
    expect(goatMeal).toBeInTheDocument();
  });
  fireEvent.click(all);
  waitFor(() => {
    const allMeal = screen.getByText('Corba');
    expect(allMeal).toBeInTheDocument();
  });
});
