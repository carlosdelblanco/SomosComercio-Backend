import type { NextFunction, Request, Response } from "express";
import CustomError from "../../../CustomError/CustomError.js";
import { Business } from "../../../database/models/Business.js";
import type { BusinessProfile } from "../../types.js";

export const loadAllBusiness = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const business = await Business.find();

    if (!business) {
      const customError = new CustomError(
        "Empty business database",
        204,
        "Empty business database"
      );
      next(customError);
      return;
    }

    res.status(200).json({
      business,
    });
  } catch (error: unknown) {
    const noContactsError = new CustomError(
      (error as Error).message,
      500,
      "No contacts found"
    );
    next(noContactsError);
  }
};

export const deleteBusiness = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { businessId } = req.params;
    const businessToDelete = await Business.findByIdAndDelete(businessId);

    res.status(200).json(businessToDelete);
  } catch (error: unknown) {
    const customError = new CustomError(
      (error as Error).message,
      404,
      "Business not found"
    );
    next(customError);
  }
};

export const createBusiness = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userAdministrator = "638dd4a849763ed9df71258e";

  const receivedBusiness = req.body as BusinessProfile;

  try {
    const newBusiness = await Business.create({
      ...receivedBusiness,
      owner: userAdministrator,
    });

    res.status(201).json({
      business: {
        ...newBusiness.toJSON(),
      },
    });
  } catch (error: unknown) {
    next(error);
  }
};
