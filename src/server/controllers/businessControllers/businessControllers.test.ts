import type { NextFunction, Request, Response } from "express";
import CustomError from "../../../CustomError/CustomError";
import { Business } from "../../../database/models/Business";
import { mockBusiness } from "../../../mocks/mockBusiness";
import {
  createBusiness,
  deleteBusiness,
  loadAllBusiness,
} from "./businessControllers";

beforeEach(() => {
  jest.clearAllMocks();
});

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const next = jest.fn();

const req: Partial<Request> = {
  body: Business,
};

describe("Given a business controller", () => {
  describe("When it's method loadAllBusiness is invoked with the existing business 'Peluqueria' ", () => {
    test("Then it should give a code 200 answer", async () => {
      const status = 200;

      Business.find = jest.fn().mockReturnValue(mockBusiness);
      await loadAllBusiness(
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(status);
    });
  });
  describe("When it is invoked with loadAllBusiness method with the database empty", () => {
    test("Then it should respond with a 204 status", async () => {
      const customError = new CustomError(
        "Database empty",
        204,
        "Database empty"
      );

      Business.find = jest.fn().mockRejectedValue(customError);
      await loadAllBusiness(req as Request, res as Response, next);
      expect(next).toHaveBeenCalledWith(customError);
    });
  });
  describe("When it is invoked with loadAllBusiness method with the database empty", () => {
    test("Then it should respond with a 204 status", async () => {
      const customError = new CustomError(
        "Empty business database",
        204,
        "Empty business database"
      );

      Business.find = jest.fn().mockResolvedValueOnce(null);
      await loadAllBusiness(
        req as Request,
        res as Response,
        next as NextFunction
      );
      expect(next).toHaveBeenCalledWith(customError);
    });
  });

  describe("Given a deleteBusiness controller", () => {
    describe("When it receives a request with businessId", () => {
      test("Then it should return a response and call it's method status code and method json", async () => {
        const expectedStatus = 200;
        const businessToDelete = mockBusiness;
        const req: Partial<Request> = {
          params: { businessId: mockBusiness.id },
        };
        Business.findByIdAndDelete = jest
          .fn()
          .mockReturnValue(businessToDelete);

        await deleteBusiness(
          req as Request,
          res as Response,
          next as NextFunction
        );
        expect(res.status).toHaveBeenCalledWith(expectedStatus);
        expect(res.json).toHaveBeenCalledWith(businessToDelete);
      });
    });
    describe("When it receives a request without any businessId", () => {
      test("Then the next function should be called with a custom error with public message 'Negocio no encontrado'", async () => {
        const req: Partial<Request> = {
          params: { businessId: mockBusiness.id },
        };
        const expectedError = new CustomError(
          "negocio no encontrado",
          404,
          "negocio no encontrado"
        );

        Business.findByIdAndDelete = jest
          .fn()
          .mockRejectedValueOnce(expectedError);

        await deleteBusiness(
          req as Request,
          res as Response,
          next as NextFunction
        );

        expect(next).toHaveBeenCalledWith(expectedError);
      });
    });
  });

  describe("Given a createBusiness controller", () => {
    describe("When it receives a request", () => {
      test("Then it should invoke it's response with status 201 and the new business", async () => {
        const expectedStatus = 201;
        const business = mockBusiness;
        const expectedResponse = { ...business };
        const req: Partial<Request> = {
          params: { userId: mockBusiness.id },
        };

        req.body = business;

        Business.create = jest.fn().mockReturnValueOnce({
          ...business,
          // eslint-disable-next-line @typescript-eslint/naming-convention
          toJSON: jest.fn().mockReturnValueOnce(business),
        });

        await createBusiness(
          req as Request,
          res as Response,
          next as NextFunction
        );

        expect(res.status).toHaveBeenCalledWith(expectedStatus);
        expect(res.json).toHaveBeenCalledWith({ business: expectedResponse });
      });
    });
  });

  describe("When it receives a request and create rejects", () => {
    test("Then it should be invoked with an error", async () => {
      const req: Partial<Request> = {
        params: {},
      };
      const error = new Error();

      Business.create = jest.fn().mockRejectedValue(error);

      await createBusiness(
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
