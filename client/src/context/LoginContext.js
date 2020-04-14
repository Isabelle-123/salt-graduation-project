import React, { createContext, useState, useEffect } from 'react';
import firebase from '../firebase';

export const LoginContext = createContext();

const LoginContextProvider = ({ children }) => {
  const [loggedinUser, setLoggedinUser] = useState('');
  const [firebaseError, setFirebaseError] = useState('');

  const checkAuthState = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const { uid, displayName } = user;
        setLoggedinUser({ uid, displayName });
        localStorage.setItem('user', JSON.stringify({ uid, displayName }));
      } else {
        setLoggedinUser('');
        localStorage.setItem('user', false);
      }
    });
  };

  useEffect(() => {
    const data = localStorage.user;
    if (data) {
      setLoggedinUser(JSON.parse(localStorage.user));
      checkAuthState();
    } else {
      checkAuthState();
    }
  }, []);

  const validateEmail = (email) => {
    const emailRegex = /^[\w._-]+@(\w[\w_-]+)+\.[a-z]{2,3}$/i;
    return emailRegex.test(email);
  };

  const logIn = async (email, password) => {
    if (validateEmail(email)) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
      } catch (error) {
        setFirebaseError({
          errorCode: error.code,
          errorMessage: error.message,
          type: error.code === 'auth/wrong-password' ? 'password' : 'email',
        });
      }
    } else {
      setFirebaseError({
        errorMessage: 'Please enter a valid email',
        type: 'email',
      });
    }
  };

  const logOut = async () => {
    try {
      await firebase.auth().signOut();
      checkAuthState();
    } catch (error) {
      console.error(error.code);
      console.error(error.message);
    }
  };

  const clearError = () => setFirebaseError('');

  return (
    <LoginContext.Provider
      value={{
        loggedinUser,
        loggedinUserActions: { logIn, logOut, clearError },
        firebaseError,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContextProvider;
