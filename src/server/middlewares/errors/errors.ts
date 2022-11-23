import type { NextFunction, Request, Response } from "express";
import type CustomError from "../../../CustomError/CustomError.js";

export const endpointError = (req: Request, res: Response) => {
  res.status(404).json({ error: "Endpoint not found" });
};

export const generalError = (
  error: CustomError,
  req: Request,
  res: Response,
  // eslint-disable-next-line no-unused-vars
  next: NextFunction
) => {
  const statusCode = error.statusCode ?? 500;
  const responseMessage = error.responseMessage || "General Error";
  res.status(statusCode).json({ error: responseMessage });
};
