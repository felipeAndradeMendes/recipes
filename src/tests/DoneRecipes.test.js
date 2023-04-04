// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import { act } from 'react-dom/test-utils';
// import renderRouter from '../helpers/helpers';
// import HeaderProvider from '../provider/HeaderProvider';
// import App from '../App';

// describe('Testa a pagina de receitas feitas', () => {
//   test('Deve ser renderizado os cards de receitas', () => {
//     const { history } = renderRouter(<App />);

//     act(() => {
//       history.push('/done-recipes');
//     });

//     expect(screen.getByRole('button', { name: /all/i })).toBeInTheDocument();
//     expect(screen.getByRole('button', { name: /meals/i })).toBeInTheDocument();
//     expect(screen.getByRole('button', { name: /drinks/i })).toBeInTheDocument();
//   });
// });
