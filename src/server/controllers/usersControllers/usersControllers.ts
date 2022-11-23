import bcrypt from "bcryptjs";
import type { NextFunction, Request, Response } from "express";
import CustomError from "../../../CustomError/CustomError.js";
import User from "../../../database/models/User.js";
import type { RegisterData } from "../../types";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body as RegisterData;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      password: hashedPassword,
    });
    res.status(201).json({ data: `${newUser.username} has been registered` });
  } catch (error: unknown) {
    const generalError = new CustomError(
      (error as Error).message,
      500,
      "Error"
    );
    next(generalError);
  }
};
