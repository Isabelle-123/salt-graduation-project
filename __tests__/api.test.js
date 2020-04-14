const axios = require('axios');

describe('The API', () => {
  it('is up and running', async () => {
    const req = await axios.get(
      'https://us-central1-way-merchant-dashboard.cloudfunctions.net/server/api'
    );
    expect(req.statusCode).toBe(200);
    expect(req.text).toBe('Way Merchant API');
  });
});
