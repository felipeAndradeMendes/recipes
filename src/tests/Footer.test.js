import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import renderRouter from '../helpers/helpers';
import Footer from '../components/Footer';
import RecipeProvider from '../provider/RecipeProvider';

describe('Testa o componente Footer', () => {
  test('Deve haver dois icones no componente', () => {
    render(
      <RecipeProvider>
        <BrowserRouter>
          <Footer />
        </BrowserRouter>
      </RecipeProvider>,
    );

    const drinkButton = screen.getByTestId('drinks-bottom-btn');
    const mealsButton = screen.getByTestId('meals-bottom-btn');

    expect(drinkButton).toBeInTheDocument();
    expect(mealsButton).toBeInTheDocument();
  });
  test('Ao clicar nos icones deve ser corretamente direcionado', () => {
    const { history } = renderRouter(
      <RecipeProvider>
        <Footer />
      </RecipeProvider>,
    );

    const drinkButton = screen.getByTestId('drinks-bottom-btn');
    const mealsButton = screen.getByTestId('meals-bottom-btn');

    userEvent.click(drinkButton);
    expect(history.location.pathname).toBe('/drinks');

    userEvent.click(mealsButton);
    expect(history.location.pathname).toBe('/meals');
  });
});
