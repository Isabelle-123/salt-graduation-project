/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  createContext,
  useState,
  useEffect,
  useReducer,
  useContext,
} from 'react';
import {
  getRandomCustomer,
  postNewOrderToFirebase,
} from './mockHelperFunctions';
import apiEndpoint from '../config';
import firebase from '../firebase';
import axios from 'axios';
import reducer from '../reducer';
import { LoginContext } from './LoginContext';

import newMockData from '../assets/new-orders-mock-data.json';

export const OrderContext = createContext();

const OrderContextProvider = ({ children }) => {
  const { loggedinUser } = useContext(LoginContext);

  const initialState = {
    orders: [],
    customers: [],
    currentStore: '',
    showOrderDetails: false,
    currentOrderDetails: {},
    customerSyncComplete: false,
    orderSyncComplete: false,
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const [newOrderData, setNewOrderData] = useState([]); // move to reducer

  useEffect(() => {
    async function fetchCustomers() {
      const { data } = await axios.get(`${apiEndpoint}/api/customers`);
      dispatch({ type: 'SET_CUSTOMERS', data });
    }
    fetchCustomers();
    return () => dispatch({ type: 'LOAD_FIREBASE', data: [] });
  }, []);

  useEffect(() => {
    if (state.customerSyncComplete && loggedinUser) {
      let database = firebase.database().ref('/');
      database
        .orderByChild('merchant')
        .equalTo(loggedinUser.displayName)
        .limitToLast(20)
        .on('value', (snapshot) => {
          const firebaseData = snapshot.val();
          storeFirebaseData(Object.values(firebaseData));
        });
      setNewOrderData(newMockData);
    }
  }, [state.customerSyncComplete, loggedinUser]);

  const storeFirebaseData = async (firebaseData) => {
    const dataWithOrderId = firebaseData.map((order) => {
      if (!order.customer) {
        const customer = getRandomCustomer(state.customers);
        return {
          ...order,
          orderId: Math.floor(Math.random() * 4) + 1,
          customer: {
            imageUrl: customer.picture,
            name: customer.name,
          },
        };
      }
      return order;
    });
    dispatch({ type: 'LOAD_FIREBASE', data: dataWithOrderId });
  };

  useEffect(() => filterCurrentStore(), [state.orders]);

  const filterCurrentStore = () => {
    const data = state.orders.find(
      (item) => item.merchant === loggedinUser.displayName
    );
    if (data) {
      dispatch({
        type: 'SET_STORE_NAME',
        data: data.merchantName,
      });
    }
  };

  const addNewOrder = () =>
    postNewOrderToFirebase(newOrderData, state, loggedinUser);

  const showOrderDetailsView = (queryId) => {
    const orderData = state.orders.find((item) => item.id === queryId);
    dispatch({ type: 'TOGGLE_ORDER_DETAILS', data: orderData });
  };

  return (
    <OrderContext.Provider
      value={{
        state,
        dispatch,
        ordersActions: { addNewOrder, showOrderDetailsView },
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContextProvider;
