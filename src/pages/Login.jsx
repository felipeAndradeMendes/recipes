import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function Login() {


  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const history = useHistory();
  const [disabled, setDisabled] = useState(true);
  useEffect(() => {
    const { email, password } = user;
    const maxLength = 6;
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (emailRegex.test(email) && password.length > maxLength) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [user]);
  return (
    <div>
      <form
        onSubmit={ (e) => {
          e.preventDefault();
          const LSEmail = {
            email: user.email,
          };
          localStorage.setItem('user', JSON.stringify(LSEmail));
          history.push('/meals');
        } }
      >
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            id="email"
            value={ user.email }
            onChange={ (e) => setUser({ ...user, email: e.target.value }) }
            data-testid="email-input"
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            id="password"
            value={ user.password }
            onChange={ (e) => setUser({ ...user, password: e.target.value }) }
            data-testid="password-input"
          />
        </label>
        <button
          disabled={ disabled }
          type="submit"
          data-testid="login-submit-btn"
        >
          Login
        </button>
      </form>
    </div>
  );
}
