import type { Response } from "express";
import type CustomError from "../../../CustomError/CustomError";
import { endpointError, generalError } from "./errors";

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

describe("Given an error middleware", () => {
  describe("and the function endpointError", () => {
    describe("When it receives a response", () => {
      test("Then it should return the method status 404 ", () => {
        const expectedStatus = 404;

        endpointError(null, res as Response);

        expect(res.status).toHaveBeenCalledWith(expectedStatus);
      });
    });

    describe("When it receives a response with customError and no status", () => {
      test("Then it should return the status 500", () => {
        const error = new Error("");

        const expectedStatus = 500;

        generalError(error as CustomError, null, res as Response, null);

        expect(res.status).toHaveBeenCalledWith(expectedStatus);
      });
    });
  });
});
