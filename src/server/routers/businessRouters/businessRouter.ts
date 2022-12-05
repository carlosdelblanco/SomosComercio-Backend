import express from "express";
import {
  createBusiness,
  deleteBusiness,
  loadAllBusiness,
} from "../../controllers/businessControllers/businessControllers.js";

// eslint-disable-next-line <new-cap></new-cap>
const businessRouter = express.Router();

businessRouter.get("/loadAllBusiness", loadAllBusiness);
businessRouter.delete("/deleteBusiness/:businessId", deleteBusiness);
businessRouter.post("/create", createBusiness);
export default businessRouter;
