// const request = require('supertest');
// const { app, server } = require('../server.js');

// afterAll((done) => {
//   server.close();
//   done();
// });

// describe.skip('The all customers API', () => {
//   it('returns 200', (done) => {
//     request(app)
//       .get('/api/customers')
//       .then((res) => {
//         expect(res.statusCode).toBe(200);
//         done();
//       });
//   });
//   it('only works for GET requests', (done) => {
//     request(app)
//       .post('/api/customers')
//       .then((res) => {
//         expect(res.statusCode).toBe(400);
//         done();
//       });
//   });
//   it('returns an array of customers', (done) => {
//     request(app)
//       .get('/api/customers')
//       .then((res) => {
//         expect(Array.isArray(res.body)).toBe(true);
//         done();
//       });
//   });
//   it('returns at least 1 customer', (done) => {
//     request(app)
//       .get('/api/customers')
//       .then((res) => {
//         expect(res.body.length).toBeGreaterThanOrEqual(1);
//         done();
//       });
//   });
//   it('returns a name and a photo', (done) => {
//     request(app)
//       .get('/api/customers')
//       .then((res) => {
//         const result = res.body[0];
//         expect(result).toHaveProperty('id');
//         expect(result).toHaveProperty('name');
//         expect(result).toHaveProperty('picture');
//         done();
//       });
//   });
//   it('returns a first and last name', (done) => {
//     request(app)
//       .get('/api/customers')
//       .then((res) => {
//         const result = res.body[0];
//         expect(result.name).toMatch(/\b\w+\s\b\w+/);
//         done();
//       });
//   });
//   it('returns url for user image', (done) => {
//     request(app)
//       .get('/api/customers')
//       .then((res) => {
//         const result = res.body[0];
//         expect(result.picture).toMatch(/(https?:\/\/.*\.(?:png|jpg))/i);
//         done();
//       });
//   });
// });
