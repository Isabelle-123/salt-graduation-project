/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from 'react';
import { LoginContext } from '../context/LoginContext';
import styled from 'styled-components';
import Button from './helpers/Button';

import logo from '../assets/logo-black.svg';

const S = {};
S.LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5%;
  text-align: center;
`;

S.Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
  text-align: center;
`;

S.Input = styled.input`
  text-align: center;
  padding: 0.2rem 1rem;
  margin: 0;
  padding: 10px 20px;
  width: 300px;
  font-size: 0.8rem;
  border: ${(props) => (props.error ? 'red' : '#ebebeb')} solid 1px;
  &:first-child {
    border-radius: 4px 4px 0 0;
  }
  border-radius: 0 0 4px 4px;
`;

S.ErrorMessage = styled.div`
  color: red;
`;

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loggedinUserActions } = useContext(LoginContext);
  const { firebaseError } = useContext(LoginContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await loggedinUserActions.logIn(email, password);
  };

  useEffect(() => {
    loggedinUserActions.clearError();
  }, [email, password]);

  return (
    <S.LoginContainer>
      <div>
        <img src={logo} alt="Way" width={200} />
        <h4>Log in to your store</h4>
      </div>
      <S.Form onSubmit={handleSubmit}>
        <S.Input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          error={firebaseError.type === 'email' ? true : false}
        />
        <S.Input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          error={firebaseError.type === 'password' ? true : false}
        />
        <Button type="submit">Log in</Button>
        <S.ErrorMessage>
          {firebaseError && firebaseError.errorMessage}
        </S.ErrorMessage>
      </S.Form>
    </S.LoginContainer>
  );
}
