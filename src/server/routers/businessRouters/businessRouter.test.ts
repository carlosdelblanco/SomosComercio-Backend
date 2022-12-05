import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import databaseConnection from "../../../database/databaseConnection";
import { Business } from "../../../database/models/Business";
import { mockBusiness } from "../../../mocks/mockBusiness";
import app from "../../app";

let server: MongoMemoryServer;
const business = mockBusiness;

beforeAll(async () => {
  await mongoose.disconnect();
  server = await MongoMemoryServer.create();
  await databaseConnection(server.getUri());
  await Business.create(business);
});

beforeEach(async () => {
  await Business.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
  await server.stop();
});

describe("Given the GET /business/loadAllBusiness", () => {
  describe("When it receives a request with an empty body and business in the database", () => {
    test("Then it should respond with a 200 status", async () => {
      const status = 200;

      const response = await request(app)
        .get("/business/loadAllBusiness")
        .expect(status);

      expect(response.body).toHaveProperty("business");
    });
  });

  describe("When it receives a request with no business in the database", () => {
    test("Then it should respond with a 200 status and an object with property 'business' that has an array of emtpy business", async () => {
      const status = 204;

      Business.find = jest.fn().mockReturnValue(null);

      const response = await request(app)
        .get("/business/loadAllBusiness")
        .expect(status);

      expect(response.body).toStrictEqual({});
    });
  });

  describe("When it receives a request and an internal server error", () => {
    test("Then it should return a 500 status", async () => {
      const status = 500;

      Business.find = jest.fn().mockRejectedValue({ error: "General Error" });

      const response = await request(app)
        .get("/business/loadAllBusiness")
        .expect(status);

      expect(response.body).toStrictEqual({ error: "No contacts found" });
    });
  });
});

describe("Given the DELETE '/business/deleteBusiness/:businessId' endpoint", () => {
  describe("When it receives a request with  a valid businessId", () => {
    test("Then it should return a response with status 200", async () => {
      const expectedStatus = 200;

      await request(app)
        .delete(`/business/deleteBusiness/${business.id}`)
        .expect(expectedStatus);
    });
  });
});

describe("Given the POST /business/create endpoint", () => {
  describe("When it receives a correct request with a correct business", () => {
    test("Then it should response with the new business created", async () => {
      const response = await request(app)
        .post("/business/create")
        .send(business)
        .expect(201);

      expect(response.body).toHaveProperty("business");
    });
  });

  describe("And when it receives an uncomplete business", () => {
    test("Then it should response with status 500 and a message 'General error'", async () => {
      const message = "General Error";

      const response = await request(app).post("/business/create").expect(500);

      expect(response.body).toHaveProperty("error", message);
    });
  });
});
