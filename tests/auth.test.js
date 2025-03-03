const request = require("supertest");
// import app from "../src/server.js";
const {app, server }= require('../src/server.js');

describe("Auth API", () => {
  it("should register a new user", async () => {
    const res = await request(server).post("/api/auth/register").send({
      name: "Test User",
      email: "kuk@example.com",
      password: "password123",
    });
    console.log(res.statusCode, res.body); 
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("userId");
  });
});
