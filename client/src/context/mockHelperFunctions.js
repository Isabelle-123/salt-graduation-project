import moment from 'moment';
import firebase from '../firebase';

const getRandomCustomer = (data) => {
  return data[Math.floor(Math.random() * 99)];
};

const postNewOrderToFirebase = (array, stateData, currentUser) => {
  let newOrder = array.splice(-1, 1);
  const customer = getRandomCustomer(stateData.customers);
  const currentStoreName = stateData.currentStore;
  newOrder = {
    ...newOrder[0],
    timeCreated: moment().format('YYYY-MM-DDTHH:mm:ss'),
    orderId: Math.floor(Math.random() * 4) + 1,
    merchantName: currentStoreName,
    merchant: currentUser.displayName,
    id: Math.floor(Math.random() * 999999999),
    customer: {
      imageUrl: customer.picture,
      name: customer.name,
    },
  };
  firebase.database().ref('/').push(newOrder);
};

export { getRandomCustomer, postNewOrderToFirebase };
