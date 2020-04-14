const express = require('express');
const axios = require('axios');

const router = express.Router();

const endpoint =
  'https://randomuser.me/api/?nat=gb&noinfo&exc=location,id,email,dob,phone,cell,registered';

const getData = async (limit) => {
  try {
    const { data } = await axios.get(`${endpoint}&results=${limit}`);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

router.get('/', async (_, res) => {
  try {
    const data = await getData(100);
    const customers = data.results.map((customer) => ({
      id: customer.login.uuid,
      name: `${customer.name.first} ${customer.name.last}`,
      picture: customer.picture.large,
    }));
    res.setHeader('Set-Cookie', 'HttpOnly;Secure;SameSite=Strict');
    res.json(customers);
  } catch (error) {
    res.sendStatus(500);
  }
});

module.exports = router;
