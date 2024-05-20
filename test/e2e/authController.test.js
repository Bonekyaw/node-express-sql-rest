const request = require("supertest");
const mongoose = require("mongoose");

const app = require("../../app");
const Admin = require("../../models/admin");
const Otp = require("../../models/otp");

describe("authController - Authentication Testing", () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb://127.0.0.1/test");
  });

  test("Register 3 steps - Should return status 200 and token, user_id.", async () => {
    const response = await request(app)
      .post("/api/v1/register")
      .set("content-type", "application/json")
      .send({
        phone: "09778***",
      })
      .then((res) => {
        return request(app)
          .post("/api/v1/verify-otp")
          .set("content-type", "application/json")
          .send({
            token: res.body.token,
            phone: "778***",
            otp: "123456",
          });
      })
      .then((res) => {
        return request(app)
          .post("/api/v1/confirm-password")
          .set("content-type", "application/json")
          .send({
            token: res.body.token,
            phone: "778***",
            password: "12345678",
          });
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("token");
    expect(response.body).toHaveProperty("user_id");
  });

  test("Login - Should return status 200 and token, user_id.", async () => {
    const response = await request(app)
      .post("/api/v1/login")
      .set("content-type", "application/json")
      .send({
        phone: "778***",
        password: "12345678",
      });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
    expect(response.body).toHaveProperty("user_id");
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });
});
