import React, { useContext } from 'react';
import logo from '../assets/logo-black.svg';
import { OrderContext } from '../context/OrderContext';
import Button from '../components/helpers/Button';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { LoginContext } from '../context/LoginContext';

const S = {};
S.Logo = styled.img`
  margin-right: 0;
  width: 100px;
`;

S.MainNav = styled.div`
  display: flex;
  background-color: #ffffff;
  align-items: center;
  margin-top: 1rem;
  > * {
    margin: 0 5px;
  }
  @media (max-width: 625px) {
    img {
      width: 90px;
    }
    p {
      font-size: 0.8rem;
    }

    padding: 0 10px;
    justify-content: space-between;
    > * {
      margin: 0;
    }
  }
`;

S.NavLinks = styled.div`
  margin-left: auto;
  display: flex;
`;

S.StoreName = styled.p`
  text-align: center;
`;

function Navigation() {
  const { state } = useContext(OrderContext);
  const { loggedinUserActions } = useContext(LoginContext);

  return (
    <S.MainNav>
      <NavLink className="main-nav-logo" exact to="/">
        <S.Logo src={logo} alt="Way" />
      </NavLink>
      <S.StoreName>{state.currentStore}</S.StoreName>
      <S.NavLinks>
        <Button onClick={loggedinUserActions.logOut}>Log out</Button>
      </S.NavLinks>
    </S.MainNav>
  );
}

export default Navigation;
