import type { NextFunction, Request, Response } from "express";
import CustomError from "../../../CustomError/CustomError";
import Business from "../../../database/models/Business";
import { mockBusiness } from "../../../mocks/mockBusiness";
import { deleteBusiness, loadAllBusiness } from "./businessControllers";

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
      test("Then it shouldreturn a response and call it's method status code and method json", async () => {
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
  });
});
