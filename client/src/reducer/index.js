export default function reducer(state, action) {
  switch (action.type) {
    case 'LOAD_FIREBASE':
      return { ...state, orders: action.data, orderSyncComplete: true };
    case 'SET_STORE_NAME':
      return { ...state, currentStore: action.data };
    case 'TOGGLE_ORDER_DETAILS': {
      const orderData = action.data ? action.data : {};
      return {
        ...state,
        showOrderDetails: !state.showOrderDetails,
        currentOrderDetails: orderData,
      };
    }
    case 'SET_CUSTOMERS':
      return { ...state, customerSyncComplete: true, customers: action.data };
    default:
      return state;
  }
}
