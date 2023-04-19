import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import logo from '../images/login-image.png';

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
    <div className="flex items-center h-[640px]">
      <div
        className="flex justify-center items-center flex-wrap w-[300px] m-auto"
      >
        <img src={ logo } alt="logo-recipes" className="w-[250px] mb-10" />
        <div className="flex w-[250px] mb-4">
          <h1
            className="text-[2.2rem] font-bold w-[180px]
          leading-9 font-['Poppins']"
          >
            Cook like a chef

          </h1>
        </div>
        <form
          className="flex flex-wrap placeholder justify-center w-[250px] gap-2.5"
          onSubmit={ (e) => {
            e.preventDefault();
            const LSEmail = {
              email: user.email,
            };
            localStorage.setItem('user', JSON.stringify(LSEmail));
            history.push('/meals');
          } }
        >
          <label htmlFor="email" className="w-[250px]">
            <input
              type="email"
              name="email"
              id="email"
              className="p-2 border-[1px] border-[#b0b0b0] rounded-[14px] w-[250px]"
              value={ user.email }
              onChange={ (e) => setUser({ ...user, email: e.target.value }) }
              data-testid="email-input"
              placeholder="Enter Email"
            />
          </label>
          <label htmlFor="password">
            <input
              type="password"
              name="password"
              id="password"
              className="p-2 border-[1px] border-[#b0b0b0]
              rounded-[14px] w-[250px] password"
              value={ user.password }
              onChange={ (e) => setUser({ ...user, password: e.target.value }) }
              data-testid="password-input"
              placeholder="Enter Password"
            />
          </label>
          <button
            disabled={ disabled }
            type="submit"
            data-testid="login-submit-btn"
            className={ `bg-[#19c27e] text-white p-2 
           font-bold rounded-[14px] w-full ${disabled ? 'opacity-50' : 'opacity-1'}` }
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
