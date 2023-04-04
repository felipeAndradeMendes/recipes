import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, fireEvent, screen } from '@testing-library/react';
import Recipes from '../pages/Recipes';
import SearchBarContext from '../context/SearchBarContext';
import HeaderProvider from '../provider/HeaderProvider';
import RecipeProvider from '../provider/RecipeProvider';

const mockContext = {
  dataApi: {
    meals: [
      {
        idMeal: '1',
        strMeal: 'Meal 1',
        strMealThumb: 'https://www.themealdb.com/images/media/meals/xxxyyyzzz.jpg',
        strCategory: 'Category 1',
      },
      {
        idMeal: '2',
        strMeal: 'Meal 2',
        strMealThumb: 'https://www.themealdb.com/images/media/meals/xxxyyyzzz.jpg',
        strCategory: 'Category 2',
      },
    ],
    drinks: [
      {
        idDrink: '1',
        strDrink: 'Drink 1',
        strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/xxxyyyzzz.jpg',
        strAlcoholic: 'Alcoholic 1',
      },
      {
        idDrink: '2',
        strDrink: 'Drink 2',
        strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/xxxyyyzzz.jpg',
        strAlcoholic: 'Alcoholic 2',
      },
    ],
  },
  isLoading: false,
  setDataApi: jest.fn(),
  setIsLoading: jest.fn(),
};

describe('Recipes component', () => {
  test('renders categories buttons', async () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <RecipeProvider>
          <HeaderProvider>
            <SearchBarContext.Provider value={ mockContext }>
              <Recipes />
            </SearchBarContext.Provider>
          </HeaderProvider>
        </RecipeProvider>
      </Router>,
    );

    const categoryButtons = screen.getAllByRole('button', { name: /category-filter/i });

    expect(categoryButtons.length).toBe(mockContext.dataApi.meals.length);

    categoryButtons.forEach((button, index) => {
      expect(button.textContent).toBe(mockContext.dataApi.meals[index].strCategory);
    });
  });

  test('renders recipes cards', async () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <SearchBarContext.Provider value={ mockContext }>
          <Recipes />
        </SearchBarContext.Provider>
      </Router>,
    );

    // Encontra os botões de categoria
    const categoryButtons = screen.getAllByRole('button', { name: /category-filter/i });

    // Clica no primeiro botão de categoria
    fireEvent.click(categoryButtons[0]);

    // Verifica se o contexto foi atualizado com a lista de receitas filtrada
  });
});
