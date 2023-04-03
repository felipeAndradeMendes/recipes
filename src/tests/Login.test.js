import React from 'react';
import { render, screen } from '@testing-library/react';
import { fireEvent } from '@testing-library/dom';
import { BrowserRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Login from '../pages/Login';

const buttonID = 'login-submit-btn';
const passwordId = 'password-input';
const emailId = 'email-input';
// const emailTest = 'teste@teste.com';

test('Verifica se o botão de login existe', () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>,
  );
  const loginButton = screen.getByTestId(buttonID);
  expect(loginButton).toBeInTheDocument();
});

test('Verifica se o botão de login está desabilitado', () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>,
  );
  const loginButton = screen.getByTestId(buttonID);
  expect(loginButton).toBeDisabled();
});

test('Verifica se pode digitar no input de email e senha, e também se habilita o botão', () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>,
  );
  const loginButton = screen.getByTestId(buttonID);
  const emailInput = screen.getByTestId(emailId);
  const passwordInput = screen.getByTestId(passwordId);
  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  fireEvent.change(emailInput, { target: { value: 'teste@teste.com' } });
  fireEvent.change(passwordInput, { target: { value: '1234567' } });
  expect(loginButton).toBeEnabled();
});

test('Verifica se salva o email no localStorage', () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>,
  );
  const loginButton = screen.getByTestId(buttonID);
  const emailInput = screen.getByTestId(emailId);
  const passwordInput = screen.getByTestId(passwordId);
  fireEvent.change(emailInput, { target: { value: 'teste@teste.com' } });
  fireEvent.change(passwordInput, { target: { value: '1234567' } });
  fireEvent.click(loginButton);
  const email = localStorage.getItem('user');
  expect(email).toBe('{ "email": emailTest" }');
});

test('Verifica se a rota muda para /meals', () => {
  const history = createMemoryHistory();
  history.push = jest.fn();

  render(
    <Router history={ history }>
      <Login />
    </Router>,
  );

  const emailInput = screen.getByTestId(emailId);
  const passwordInput = screen.getByTestId(passwordId);
  const loginButton = screen.getByTestId(buttonID);

  fireEvent.change(emailInput, { target: { value: emailTest } });
  fireEvent.change(passwordInput, { target: { value: '123456' } });
  fireEvent.click(loginButton);

  expect(history.location.pathname).toBe('/meals');
});
