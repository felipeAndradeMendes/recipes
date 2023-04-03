import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Header from '../components/Header';
import HeaderProvider from '../provider/HeaderProvider';

describe('Testes do Componente Header', () => {
  test('Os componentes são renderizados', () => {
    render(
      <HeaderProvider>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </HeaderProvider>,
    );
    const profileIcon = screen.getByTestId('profile-top-btn');
    const searchIcon = screen.getByTestId('search-top-btn');
    expect(profileIcon).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();

    userEvent.click(searchIcon);
    expect(screen.getByText(/barra de busca/i)).toBeInTheDocument();
    userEvent.click(searchIcon);
    expect(screen.queryByText(/barra de busca/i)).not.toBeInTheDocument();

    userEvent.click(profileIcon);
    expect(screen.getByText(/profile/i)).toBeInTheDocument();
    screen.logTestingPlaygroundURL();
  });
});
