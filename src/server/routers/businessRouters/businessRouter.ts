import express from "express";
import {
  deleteBusiness,
  loadAllBusiness,
} from "../../controllers/businessControllers/businessControllers.js";

// eslint-disable-next-line new-cap
const businessRouter = express.Router();

businessRouter.get("/loadAllBusiness", loadAllBusiness);
businessRouter.delete("/deleteBusiness/:businessId", deleteBusiness);

export default businessRouter;
