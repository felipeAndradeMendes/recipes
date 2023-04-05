// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import { act } from 'react-dom/test-utils';
// import { createMemoryHistory } from 'history';
// import { Router } from 'react-router-dom';
// import renderRouter from '../helpers/helpers';
// import HeaderProvider from '../provider/HeaderProvider';
// import App from '../App';
// import SearchBarProvider from '../provider/SearchBarProvider';
// import DoneRecipes from '../pages/DoneRecipes';
// import Header from '../components/Header';

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

//   test('Bototes renderizam corretamente', () => {
//     const history = createMemoryHistory();
//     history.push('/done-recipes');
//     const doneRecipesArray = [{
//       id: 0,
//       type: 'meal',
//       nationality: 'brasileira',
//       category: 'chicken',
//       alcoholicOrNot: '',
//       name: 'Receitão Xablau',
//       image: 'https://assets.epicurious.com/photos/62f16ed5fe4be95d5a460eed/1:1/w_960,c_limit/RoastChicken_RECIPE_080420_37993.jpg',
//       doneDate: '04/04/2023',
//       tags: ['frango', 'comida'],
//     },
//     {
//       id: 1,
//       type: 'drink',
//       nationality: 'americana',
//       category: 'beef',
//       alcoholicOrNot: '',
//       name: 'Receitão sinistro',
//       image: 'https://cdn.britannica.com/18/137318-050-29F7072E/rooster-Rhode-Island-Red-roosters-chicken-domestication.jpg?w=400&h=300&c=crop',
//       doneDate: '05/04/2023',
//       tags: ['galo', 'rango'],
//     }];
//     // localStorage.setItem('doneRecipes', JSON.stringify(doneRecipesArray));

//     // jest.spyOn(Storage.prototype, 'getItem');
//     Storage.prototype.getItem = jest.fn(() => doneRecipesArray);

//     render(
//       <Router history={ history }>
//         <SearchBarProvider>
//           <HeaderProvider>
//             <DoneRecipes />
//           </HeaderProvider>
//         </SearchBarProvider>
//       </Router>,
//     );
//     expect(history.location.pathname).toBe('/done-recipes');
//   });
// });
