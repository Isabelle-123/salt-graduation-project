const express = require('express');
const axios = require('axios');

const router = express.Router();
const imageEndpoint = 'https://assets.icanet.se/t_product_small_v1,f_auto';
const firbaseStorageEndpoint =
  'https://firebasestorage.googleapis.com/v0/b/way-merchant-dashboard.appspot.com/o';
const fireBaseSuffix = '?alt=media';

const firebaseCache = (res) =>
  res.set('Cache-Control', 'public, max-age=604800, s-maxage=604800');

const rareImages = [
  '40099330',
  '856991004905',
  '2319291709430',
  '2340302105897',
  '5024278003063',
];

const getApiImage = async (res, gtin) => {
  try {
    const response = await axios.get(`${imageEndpoint}/${gtin}`);
    if (response.status === 200) {
      firebaseCache(res);
      res.json({
        path: `${response.config.url}.jpg`,
      });
    }
  } catch (error) {
    throw new Error(error);
  }
};

const getStoredImage = async (res, gtin) => {
  try {
    const response = await axios.get(
      `${firbaseStorageEndpoint}/${gtin}.jpg${fireBaseSuffix}`
    );
    if (response.status === 200) {
      firebaseCache(res);
      res.json({
        path: `${response.config.url}`,
      });
    }
  } catch (error) {
    throw new Error(error);
  }
};

router.get('/:gtin', async (req, res) => {
  try {
    const { gtin } = req.params;
    if (rareImages.indexOf(gtin) !== -1) {
      // return stored image
      await getStoredImage(res, gtin);
    } else {
      // return image from ICA api
      await getApiImage(res, req.params.gtin);
    }
  } catch (error) {
    res.sendStatus(404);
  }
});

module.exports = router;
