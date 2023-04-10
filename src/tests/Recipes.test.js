import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import App from '../pages/Recipes';
import SearchBarContext from '../context/SearchBarContext';
import HeaderProvider from '../provider/HeaderProvider';
import RecipeProvider from '../provider/RecipeProvider';
import fetch from '../../cypress/mocks/fetch';

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
  test('Testa se as categorias de drinks funcionam', async () => {
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
    waitFor(() => {
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
});
test('Testa se as categorias de meals funcionam', async () => {
  const history = createMemoryHistory();
  history.push('/meals');
  render(
    <Router history={ history }>
      <RecipeProvider>
        <HeaderProvider>
          <SearchBarContext.Provider value={ mockContext }>
            <App />
          </SearchBarContext.Provider>
        </HeaderProvider>
      </RecipeProvider>
    </Router>,
  );
  expect(history.location.pathname).toBe('/meals');
  await waitFor(() => {
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
});

test('Testa se 12 bebidas são renderizadas', async () => {
  jest.spyOn(global, 'fetch');
  global.fetch.mockImplementation(fetch);
  const history = createMemoryHistory();
  history.push('/drinks');
  render(
    <Router history={ history }>
      <RecipeProvider>
        <HeaderProvider>
          <SearchBarContext.Provider value={ mockContext }>
            <App />
          </SearchBarContext.Provider>
        </HeaderProvider>
      </RecipeProvider>
    </Router>,
  );
  expect(history.location.pathname).toBe('/drinks');

  await waitFor(() => {
    const drink = screen.getAllByTestId(`${0}-recipe-card`);
    expect(drink[0]).toBeInTheDocument();
  });
});

test('Testa se 12 comidas são renderizadas', async () => {
  const history = createMemoryHistory();
  history.push('/meals');
  jest.spyOn(global, 'fetch');
  global.fetch.mockImplementation(fetch);
  render(
    <Router history={ history }>
      <RecipeProvider>
        <HeaderProvider>
          <SearchBarContext.Provider value={ mockContext }>
            <App />
          </SearchBarContext.Provider>
        </HeaderProvider>
      </RecipeProvider>
    </Router>,
  );
  expect(history.location.pathname).toBe('/meals');

  await waitFor(() => {
    const meal = screen.getAllByTestId(`${0}-recipe-card`);
    expect(meal[0]).toBeInTheDocument();
  });
});

test('Testa se o loading aparece', () => {
  const history = createMemoryHistory();
  history.push('/meals');
  jest.spyOn(global, 'fetch');
  global.fetch.mockImplementation(fetch);
  render(
    <Router history={ history }>
      <RecipeProvider>
        <HeaderProvider>
          <SearchBarContext.Provider value={ mockContext }>
            <App />
          </SearchBarContext.Provider>
        </HeaderProvider>
      </RecipeProvider>
    </Router>,
  );
  expect(history.location.pathname).toBe('/meals');

  const loading = screen.getByText('Loading...');
  expect(loading).toBeInTheDocument();
});

test('Testa se o card redireciona para URL in-progress', () => {
  const history = createMemoryHistory();
  history.push('/meals');
  jest.spyOn(global, 'fetch');
  global.fetch.mockImplementation(fetch);
  render(
    <Router history={ history }>
      <RecipeProvider>
        <HeaderProvider>
          <SearchBarContext.Provider value={ mockContext }>
            <App />
          </SearchBarContext.Provider>
        </HeaderProvider>
      </RecipeProvider>
    </Router>,
  );
  expect(history.location.pathname).toBe('/meals');

  const meal = screen.getAllByTestId(`${0}-recipe-card`);
  fireEvent.click(meal[0]);
  expect(history.location.pathname).toBe('/comidas/52977/in-progress');
});

test('Testa se o botão categorias é um toggler', async () => {
  const history = createMemoryHistory();
  history.push('/meals');
  jest.spyOn(global, 'fetch');
  global.fetch.mockImplementation(fetch);
  render(
    <Router history={ history }>
      <RecipeProvider>
        <HeaderProvider>
          <SearchBarContext.Provider value={ mockContext }>
            <App />
          </SearchBarContext.Provider>
        </HeaderProvider>
      </RecipeProvider>
    </Router>,
  );
  expect(history.location.pathname).toBe('/meals');
  screen.logTestingPlaygroundURL();
  await waitFor(() => {
    const categories = screen.getByTestId('Beef-category-filter');
    const allCategories = screen.getByTestId('All-category-filter');
    expect(categories).toBeInTheDocument();
    fireEvent.click(categories);
    const card0 = screen.getByTestId('0-recipe-card');
    expect(card0).toHaveTextContent('Beef and Mustard Pie');
    fireEvent.click(categories);
    expect(card0).toHaveTextContent('Corba');
    fireEvent.click(allCategories);
    expect(card0).toHaveTextContent('Corba');
  });
  test('Testa se o botão all funciona', async () => {
    history.push('/meals');
    jest.spyOn(global, 'fetch');
    global.fetch.mockImplementation(fetch);
    render(
      <Router history={ history }>
        <RecipeProvider>
          <HeaderProvider>
            <SearchBarContext.Provider value={ mockContext }>
              <App />
            </SearchBarContext.Provider>
          </HeaderProvider>
        </RecipeProvider>
      </Router>,
    );
    expect(history.location.pathname).toBe('/meals');
    screen.logTestingPlaygroundURL();
    await waitFor(() => {
      const allCategories = screen.getByTestId('All-category-filter');
      expect(allCategories).toBeInTheDocument();
      fireEvent.click(allCategories);
      const card0 = screen.getByTestId('0-recipe-card');
      expect(card0).toHaveTextContent('Corba');
      history.push('/drinks');
      expect(history.location.pathname).toBe('/drinks');
      fireEvent.click(allCategories);
      expect(card0).toHaveTextContent('GG');
    });
  });
});
