/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  createContext,
  useState,
  useEffect,
  useReducer,
  useContext,
} from 'react';
import apiEndpoint from '../config';
import newMockData from '../assets/new-checkouts-mock-data.json';
import moment from 'moment';
import firebase from '../firebase';
import axios from 'axios';
import reducer from '../reducer';
import { LoginContext } from './LoginContext';

export const CheckoutContext = createContext();

const CheckoutContextProvider = ({ children }) => {
  const { loggedinUser } = useContext(LoginContext);

  const initialState = {
    checkouts: [],
    customers: [],
    currentStore: '',
    showOrderDetails: false,
    currentOrderDetails: {},
    customerSyncComplete: false,
    checkoutSyncComplete: false,
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const [newCheckoutData, setNewCheckoutData] = useState([]); // move to reducer

  const addCheckoutId = async (firebaseData) => {
    const dataWithCheckoutId = firebaseData.map((checkout) => {
      if (!checkout.customer) {
        const customer = getRandomCustomer();
        return {
          ...checkout,
          checkoutId: Math.floor(Math.random() * 4) + 1,
          customer: {
            imageUrl: customer.picture,
            name: customer.name,
          },
        };
      }
      return checkout;
    });
    dispatch({ type: 'LOAD_FIREBASE', data: dataWithCheckoutId });
  };

  const getRandomCustomer = () =>
    state.customers[Math.floor(Math.random() * 99)];

  const filterCurrentStore = () => {
    if (state.checkouts[0]) {
      dispatch({
        type: 'SET_STORE_NAME',
        data: state.checkouts[0].merchantName,
      });
    }
  };

  const addNewCheckout = () => {
    let newCheckout = newCheckoutData.splice(-1, 1);
    const customer = getRandomCustomer();

    newCheckout = {
      ...newCheckout[0],
      timeCreated: moment().format('YYYY-MM-DDTHH:mm:ss'),
      checkoutId: Math.floor(Math.random() * 4) + 1,
      id: Math.floor(Math.random() * 999999999),
      customer: {
        imageUrl: customer.picture,
        name: customer.name,
      },
    };
    firebase
      .database()
      .ref('/')
      .push(newCheckout);
  };

  useEffect(() => {
    async function fetchCustomers() {
      const { data } = await axios.get(`${apiEndpoint}/api/customers`);
      dispatch({ type: 'SET_CUSTOMERS', data });
    }
    fetchCustomers();
  }, []);

  const showMoreDetails = (queryId) => {
    const orderData = state.checkouts.find((item) => item.id === queryId);
    dispatch({ type: 'TOGGLE_ORDER_DETAILS', data: orderData });
  };

  useEffect(() => {
    if (state.customerSyncComplete && loggedinUser) {
      let database = firebase.database().ref('/');
      database
        .orderByChild('merchant')
        .equalTo(loggedinUser.displayName)
        .limitToLast(20)
        .on('value', (snapshot) => {
          console.log('getting firebase data');

          const firebaseData = snapshot.val();
          addCheckoutId(Object.values(firebaseData));
        });
      setNewCheckoutData(newMockData);
    }
  }, [state.customerSyncComplete]);

  useEffect(() => filterCurrentStore(), [state.checkoutSyncComplete]);

  return (
    <CheckoutContext.Provider
      value={{
        state,
        dispatch,
        checkoutsActions: { addNewCheckout, showMoreDetails },
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

export default CheckoutContextProvider;
