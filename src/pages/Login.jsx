import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import logo from '../images/logo-recipes.png';

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
    <div
      className="h-[640px] flex justify-center items-center flex-col gap-10 bg-[#d5f7e9]"
    >
      <img src={ logo } alt="logo-recipes" className="w-1/2" />
      <form
        className="flex justify-center items-center flex-col gap-2 placeholder"
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
          <input
            type="email"
            name="email"
            id="email"
            className="p-2 border-2 border-[#0a9b61] rounded-md
             focus:border-green-500 outline-none"
            value={ user.email }
            onChange={ (e) => setUser({ ...user, email: e.target.value }) }
            data-testid="email-input"
            placeholder="Email"
          />
        </label>
        <label htmlFor="password">
          <input
            type="password"
            name="password"
            id="password"
            className="p-2 border-2 border-[#0a9b61] rounded-md
             focus:border-green-500 outline-none"
            value={ user.password }
            onChange={ (e) => setUser({ ...user, password: e.target.value }) }
            data-testid="password-input"
            placeholder="Password"
          />
        </label>
        <button
          disabled={ disabled }
          type="submit"
          data-testid="login-submit-btn"
          className={ `bg-[#0a9b61] hover:bg-[#5db994] text-white p-2
           font-bold rounded-md w-full ${disabled ? 'opacity-50' : 'opacity-1'}` }
        >
          Login
        </button>
      </form>
    </div>
  );
}
