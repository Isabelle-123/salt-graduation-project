import React, { useContext } from 'react';
import OrderContextProvider from './context/OrderContext';
import OrderContainer from './components/OrderContainer';
import Login from './components/Login';
import Navigation from './components/Navigation';
import { LoginContext } from './context/LoginContext';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';

export default function App() {
  const { loggedinUser } = useContext(LoginContext);
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          {loggedinUser ? (
            <OrderContextProvider>
              <Navigation />
              <OrderContainer />
            </OrderContextProvider>
          ) : (
            <Login />
          )}
        </Route>
        <Route path="/login" component={Login} />
      </Switch>
    </BrowserRouter>
  );
}
