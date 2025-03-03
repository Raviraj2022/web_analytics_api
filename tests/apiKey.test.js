const request = require("supertest");
// import app from '../src/server.js';
const {app, server} = require('../src/server.js');

describe('API Key Management', () => {
  let token, appId, apiKey;

  beforeAll(async () => {
    const userRes = await request(server).post('/api/auth/register').send({
      name: 'Test User',
      email: 'test2@example.com',
      password: 'password123',
    });

    const loginRes = await request(server).post('/api/auth/login').send({
      email: 'test2@example.com',
      password: 'password123',
    });

    token = loginRes.body.token;

    const appRes = await request(server)
        .post('/api/apps/register_app')
        .set('Authorization', `Bearer ${token}`)
        .send({userId:19, name: 'Test App' });
    
      console.log("App Response:", appRes.body);
      appId = appRes.body.id;
  });

  it('should generate an API key', async () => {
    const res = await request(server)
      .post('/api/key/generate')
      .set('Authorization', `Bearer ${token}`)
      .send({ appId, apiKey:"741ba17a757f90274d04dbb3926fb65b10385393" });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('apiKey');
    console.log(res.body)
    apiKey = res.body.apiKey;
  });

  it('should revoke an API key', async () => {
    const res = await request(server)
      .post('/api/key/revoke')
      .set('Authorization', `Bearer ${token}`)
      .send({ apiKey });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message');
  });
});
