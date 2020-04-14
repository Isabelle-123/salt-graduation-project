// const request = require('supertest');
// const { app, server } = require('../server.js');
// const appProductIds = require('./testarray');

// afterAll((done) => {
//   server.close();
//   done();
// });

// describe.skip('The API', () => {
//   it('is up and running', (done) => {
//     request(app)
//       .get('/api/products/8717163691618')
//       .then((res) => {
//         expect(res.statusCode).toEqual(200);
//         done();
//       });
//   });
//   it('returns 404 for a non existing image', (done) => {
//     request(app)
//       .get('/api/products/fake')
//       .then((res) => {
//         expect(res.statusCode).toEqual(404);
//         done();
//       });
//   });
//   it('returns an object with an image path', (done) => {
//     request(app)
//       .get('/api/products/8717163691618')
//       .then((res) => {
//         expect(res.body).toHaveProperty('path');
//         expect(res.body.path).toMatch(/((?:png|jpg))/i);
//         done();
//       });
//   });
//   appProductIds.forEach((gtin) => {
//     it('returns images for all products', (done) => {
//       request(app)
//         .get(`/api/products/${gtin}`)
//         .then((res) => {
//           expect(res.statusCode).toEqual(200);
//           expect(res.body).toHaveProperty('path');
//           expect(res.body.path).toMatch(/.*.jpg$/i);
//           done();
//         })
//         .catch(() => console.log('missing gtin', gtin));
//     });
//   });
// });

// describe('The ICA image API', () => {
//   it('is up and running', (done) => {
//     request('https://assets.icanet.se/t_product_large_v1,f_auto')
//       .get('/5712840020043')
//       .then((res) => {
//         expect(res.statusCode).toEqual(200);
//         done();
//       });
//   });
// });
