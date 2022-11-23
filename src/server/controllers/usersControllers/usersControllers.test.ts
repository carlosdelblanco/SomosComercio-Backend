import bcrypt from "bcryptjs";
import type { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import User from "../../../database/models/User";
import type { RegisterUser } from "../types";
import { registerUser } from "./usersControllers";

beforeEach(() => {
  jest.clearAllMocks();
});

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const next = jest.fn();

describe("Given a register controller", () => {
  const user: RegisterUser = {
    name: "carlos",
    email: "car@los.com",
    password: "carlos",
  };

  const req: Partial<Request> = {
    body: user,
  };

  describe("When it receives a user request with name 'carlos', email 'car@los.com' and password 'carlos", () => {
    test("Then it should call its code status with 201 with the message carlos has been registered'", async () => {
      const expectedStatus = 201;
      const hashedPassword = "123456767890";
      const expectedData = {
        data: `${user.name} has been registered`,
      };

      // User.create = jest.fn().mockResolvedValueOnce(user);
      const userId = new mongoose.Types.ObjectId();
      bcrypt.hash = jest.fn().mockResolvedValue(hashedPassword);
      User.create = jest.fn().mockResolvedValueOnce({
        username: user.name,
        _id: userId,
        password: hashedPassword,
      });

      await registerUser(req as Request, res as Response, null);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith(expectedData);
    });
  });

  describe("When it receives a user request with name 'carlos' that already exists", () => {
    test("Then it should next with status 500 and a public message 'Unable to register'", async () => {
      const error = new Error("Unable to register");

      User.create = jest.fn().mockRejectedValueOnce(error);

      await registerUser(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
