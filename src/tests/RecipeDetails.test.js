// import React from 'react';
// import { Router } from 'react-router-dom';
// import { createMemoryHistory } from 'history';
// import { render, fireEvent, screen, waitFor } from '@testing-library/react';
// import App from '../pages/Recipes';
// import SearchBarContext from '../context/SearchBarContext';
// import HeaderProvider from '../provider/HeaderProvider';
// import RecipeProvider from '../provider/RecipeProvider';
// import fetch from '../../cypress/mocks/fetch';

// const mockContext = {
//   dataApi: {
//     meals: [
//       {
//         idMeal: '1',
//         strMeal: 'Meal 1',
//         strCategory: 'Category 1',
//       },
//       {
//         idMeal: '2',
//         strMeal: 'Meal 2',
//         strCategory: 'Category 2',
//       },
//     ],
//     drinks: [
//       {
//         idDrink: '1',
//         strDrink: 'Drink 1',
//         strAlcoholic: 'Alcoholic 1',
//       },
//       {
//         idDrink: '2',
//         strDrink: 'Drink 2',
//         strAlcoholic: 'Alcoholic 2',
//       },
//     ],
//   },
//   setDataApi: jest.fn(),
//   setIsLoading: jest.fn(),
// };
// const history = createMemoryHistory();

// test('Testa se a receita correta aparece na página', async () => {
//   jest.spyOn(global, 'fetch');
//   global.fetch.mockImplementation(fetch);
//   history.push('/drinks/15997');
//   render(
//     <Router history={ history }>
//       <RecipeProvider>
//         <HeaderProvider>
//           <SearchBarContext.Provider value={ mockContext }>
//             <App />
//           </SearchBarContext.Provider>
//         </HeaderProvider>
//       </RecipeProvider>
//     </Router>,
//   );
//   expect(history.location.pathname).toBe('/drinks/15997');
//   await waitFor(() => {
//     const drink = screen.getByTestId('recipe-title');
//     expect(drink).toHaveTextContent('GG');
//   });
// });
