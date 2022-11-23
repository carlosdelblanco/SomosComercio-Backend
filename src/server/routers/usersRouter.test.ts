import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import databaseConnection from "../../database/databaseConnection";
import User from "../../database/models/User";
import app from "../app";
import type { RegisterData } from "../types";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await databaseConnection(server.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await server.stop();
});

beforeEach(async () => {
  await User.deleteMany();
});

describe("Given a POST /users/signup endpoint", () => {
  describe("When it receives a request with username 'carlos' and password 'carlos'", () => {
    test("Then it should respond with a 201 code and message 'Carlos has been registered'", async () => {
      const registerData: RegisterData = {
        username: "carlos",
        email: "car@los.com",
        password: "carlos",
      };

      const expectedStatus = 201;
      const expectedMessage = {
        data: `${registerData.username} has been registered`,
      };

      const response = await request(app)
        .post("/users/signup")
        .send(registerData)
        .expect(expectedStatus);

      expect(response.body).toStrictEqual(expectedMessage);
    });
  });

  describe("When it receives a request with username: 'carlos', password: 'carlos' which already exists", () => {
    test("Then it should respond witch code status 500 and the error 'Unable to register", async () => {
      await User.create({
        username: "carlos",
        email: "car@los.com",
        password: "carlos",
      });
      const requestBody: RegisterData = {
        username: "carlos",
        email: "car@los.com",
        password: "carlos",
      };
      const expectedStatus = 500;
      const expectedMessage = { error: "Error" };

      const response = await request(app)
        .post("/users/signup")
        .send(requestBody)
        .expect(expectedStatus);

      expect(response.body).toStrictEqual(expectedMessage);
    });
  });
});
