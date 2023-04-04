import React from 'react';
import { within, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import SearchBar from '../components/SearchBar';
import SearchBarProvider from '../provider/SearchBarProvider';
import renderRouter from '../helpers/helpers';
import App from '../App';

// global.fetch = jest.fn(async () => ({
//   json: async () => planetsData,
// }));

describe('Testa o componente SearchBar', () => {
  test('Deve haver inputs para opções de pesquisa (texto, radio e botao)', async () => {
    render(
      <SearchBarProvider>
        <SearchBar />
      </SearchBarProvider>,
    );

    const inputText = screen.getByRole('textbox');
    const nameRadio = screen.getByText('Name');
    const indregientRadio = screen.getByText('Ingredient');
    const firstLetterRadio = screen.getByText('First letter');
    const buttonSearch = screen.getByRole('button', { name: /Search/ });

    expect(inputText).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(indregientRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();
    expect(buttonSearch).toBeInTheDocument();
  });
  test('Deve ser feita uma requisicao a API ao clicar no botao', async () => {
    const { history } = renderRouter(
      <App />,
    );

    act(() => {
      history.push('/meals');
    });

    const openSearchBarButton = screen.getByRole('button', {
      name: /search icon/i,
    });

    userEvent.click(openSearchBarButton);

    const inputText = screen.getByRole('textbox');
    const view = screen.getByText(/first letter/i);
    const test = within(view).getByRole('radio');

    const buttonSearch = screen.getByTestId('exec-search-btn');

    userEvent.type(inputText, 'c');
    userEvent.click(test);
    userEvent.click(buttonSearch);
    screen.logTestingPlaygroundURL();

    expect(await screen.findByText(/Chocolate Gateau/i)).toBeInTheDocument();
  });
});
