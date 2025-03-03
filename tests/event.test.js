const request = require("supertest");
// import app from '../src/server.js';
const {app, server} = require('../src/server.js');

describe('Event Collection API', () => {
  let apiKey;
  let token;
  let appId;

  // beforeAll((done) => {
  //   server.listen(done); // ✅ Start server before tests
  // });
  
  // afterAll((done) => {
  //   server.close(done); // ✅ Close server after tests
  // });

  beforeAll(async () => {

    const authRes = await request(server)
    .post('/api/auth/login')
    .send({ email: 'tes@example.com', password: 'password123' });

  console.log("Auth Response:", authRes.body); // Debug auth response
  token = authRes.body.token;

  const appRes = await request(server)
    .post('/api/apps/register_app')
    .set('Authorization', `Bearer ${token}`)
    .send({userId:19, name: 'Test App' });

  console.log("App Response:", appRes.body);
  appId = appRes.body.id;


    const res = await request(server)
      .post('/api/key/generate')
      .set('Authorization', `Bearer ${token}`)
      .send({ appId, apiKey :  "c24741ba17a757f974d04dbb3926fb65b52310385" });
console.log(res.body);
    apiKey = res.body.apiKey;
  });

  it('should collect an event', async () => {
    const res = await request(server)
      .post('/api/event/collect')
      .set('x-api-key', apiKey)
      .send({
        eventName: 'login_button_click',
        url: 'https://example.com',
        referrer: 'https://google.com',
        device: 'mobile',
        ipAddress: '192.168.1.1',
        metadata: { browser: 'Chrome', os: 'Android' },
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('message');
  });

  it('should reject missing API key', async () => {
    const res = await request(server).post('/api/event/collect').send({
      eventName: 'login_button_click',
      url: 'https://example.com',
    });

    expect(res.statusCode).toBe(401);
  });
});
