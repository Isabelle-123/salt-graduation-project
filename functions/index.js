const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const compression = require('compression');

const app = express();
const { customersRoutes, productsRoutes } = require('./routes');

app.use(cors());
app.use(
  compression({
    level: 7,
  }),
);

app.post('*', (_, res) => res.sendStatus(400));
app.delete('*', (_, res) => res.sendStatus(400));
app.patch('*', (_, res) => res.sendStatus(400));

app.get('/api', (_, res) => res.send('Way Merchant API'));

app.use('/api/customers', customersRoutes);
app.use('/api/products', productsRoutes);

exports.server = functions.region('europe-west3').https.onRequest(app);
