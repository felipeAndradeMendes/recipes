// import React from 'react';
// import { Router } from 'react-router-dom';
// import { createMemoryHistory } from 'history';
// import { render, fireEvent, screen, waitFor } from '@testing-library/react';
// import { act } from 'react-dom/test-utils';
// import App from '../pages/Recipes';
// import SearchBarContext from '../context/SearchBarContext';
// import HeaderProvider from '../provider/HeaderProvider';
// import RecipeProvider from '../provider/RecipeProvider';
// import fetch from '../../cypress/mocks/fetch';
// import RecipeDetails from '../pages/RecipeDetails';

// const history = createMemoryHistory();

// beforeEach(() => {
//   const pathname = history.location.pathname.includes('meals') ? '/meals/52977' : '/drinks/52977';
//   const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${pathname}`;
//   jest.spyOn(global, 'fetch').mockImplementation(fetch(url));
// });

// test('Testa se a página de detalhes da receita é renderizada', async () => {
//   render(
//     <Router history={ history }>
//       <HeaderProvider>
//         <SearchBarContext.Provider
//           value={ { setDataApi: jest.fn(),
//             setIsLoading: jest.fn() } }
//         >
//           <RecipeProvider>
//             <RecipeDetails />
//           </RecipeProvider>
//         </SearchBarContext.Provider>
//       </HeaderProvider>
//     </Router>,
//   );
//   act(() => {
//     history.push('/meals/52977');
//     screen.logTestingPlaygroundURL();
//     const title = screen.findByTestId('recipe-title');
//     expect(title).toBeInTheDocument();
//   });
// });
