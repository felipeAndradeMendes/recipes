import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderRouter from '../helpers/helpers';
import App from '../App';
import doneRecipesArray from '../helpers/LocalStorageTest';

const route = '/favorite-recipes';

const setLocalStorage = () => {
  window.localStorage.setItem('favoriteRecipes', JSON.stringify(doneRecipesArray));
};

Object.assign(navigator, {
  clipboard: {
    writeText: () => {},
  },
});

describe('Testa a tela de Receitas favoritas', () => {
  beforeEach(() => {
    setLocalStorage();
  });
  jest.spyOn(navigator.clipboard, 'writeText');
  // beforeAll(() => {
  //   yourImplementationThatWouldInvokeClipboardWriteText();
  // });
  test('Os elementos devem ser renderizados corretamente', () => {
    const { history } = renderRouter(<App />);

    act(() => {
      history.push(route);
    });

    const buttonAll = screen.getByRole('button', { name: /all/i });
    const buttonMeals = screen.getByRole('button', { name: /meals/i });
    const buttonDrinks = screen.getByRole('button', { name: /drinks/i });

    expect(buttonAll).toBeInTheDocument();
    expect(buttonMeals).toBeInTheDocument();
    expect(buttonDrinks).toBeInTheDocument();
  });
  test('Ao clicas nos filtros as receitas devem ser renderizadas', () => {
    const { history } = renderRouter(<App />);

    act(() => {
      history.push(route);
    });

    const buttonAll = screen.getByRole('button', { name: /all/i });
    const buttonMeals = screen.getByRole('button', { name: /meals/i });
    const buttonDrinks = screen.getByRole('button', { name: /drinks/i });

    userEvent.click(buttonDrinks);
    expect(screen.queryByText(/Receitão Xablau/i)).not.toBeInTheDocument();

    userEvent.click(buttonAll);
    expect(screen.getByText(/Receitão sinistro/i)).toBeInTheDocument();
    expect(screen.getByText(/Receitão Xablau/i)).toBeInTheDocument();

    userEvent.click(buttonMeals);
    expect(screen.queryByText(/Receitão sinistro/i)).not.toBeInTheDocument();
  });
  test('Ao clicar no botao de desfavoritar a receita e removida da pagina', () => {
    const { history } = renderRouter(<App />);

    act(() => {
      history.push(route);
    });

    const favoriteButton = screen.getAllByRole('img', { name: /blackhearticon/i });

    userEvent.click(favoriteButton[0]);

    expect(screen.queryByText(/Receitão Xablau/i)).not.toBeInTheDocument();

    userEvent.click(favoriteButton[1]);

    expect(screen.queryByText(/Receitão sinistro/i)).not.toBeInTheDocument();
  });

  test('Ao clicar no incone de compartilhar deve ser copiado a receita', async () => {
    const { history } = renderRouter(<App />);

    act(() => {
      history.push('/favorite-recipes');
    });

    const shareButton = screen.getByTestId('1-horizontal-share-btn');

    userEvent.click(shareButton);
    expect(navigator.clipboard.writeText).toHaveBeenCalled();
    // expect(screen.getByText(/Link Copied!/i));
  });
});

// test('Ao clicar no incone de compartilhar deve ser copiado a receita', async () => {
//   jest.mock('clipboard-copy', () => ({
//     clipboardCopy: jest.fn(),
//   }));
//   const mockClipboardCopy = clipboardCopy.clipboardCopy;
//   mockClipboardCopy.mockImplementation(() => {
//   });
//   const { history } = renderRouter(<App />);

//   act(() => {
//     history.push('/favorite-recipes');
//   });

//   const shareButton = screen.getByTestId('1-horizontal-share-btn');

//   userEvent.click(shareButton);

//   expect(screen.getByText(/Link Copied!/i));
// });
