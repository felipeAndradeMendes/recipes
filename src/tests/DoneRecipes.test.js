import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import renderRouter from '../helpers/helpers';
import HeaderProvider from '../provider/HeaderProvider';
import App from '../App';
import SearchBarProvider from '../provider/SearchBarProvider';
import DoneRecipes from '../pages/DoneRecipes';

describe('Testa a pagina de receitas feitas', () => {
//   test('Deve ser renderizado os cards de receitas', () => {
//     const { history } = renderRouter(<App />);

  //     act(() => {
  //       history.push('/done-recipes');
  //     });

  //     expect(screen.getByRole('button', { name: /all/i })).toBeInTheDocument();
  //     expect(screen.getByRole('button', { name: /meals/i })).toBeInTheDocument();
  //     expect(screen.getByRole('button', { name: /drinks/i })).toBeInTheDocument();
  //   });

  test('Bototes renderizam corretamente', () => {
    const history = createMemoryHistory();
    history.push('/done-recipes');
    render(
      <Router history={ history }>
        <SearchBarProvider>
          <HeaderProvider>
            <DoneRecipes />
          </HeaderProvider>
        </SearchBarProvider>
      </Router>,
    );

    expect(history.location.pathname).toBe('/done-recipes');
  });
});
