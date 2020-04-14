const apiEndpoint =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_API_ENDPOINT
    : 'http://localhost:5000';

export default apiEndpoint;
