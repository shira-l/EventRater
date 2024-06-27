import express from "express";
import { BusinessController } from '../controllers/businessController.js'
const businessRouter = express.Router();
const businessController = new BusinessController();
console.log("business router")
businessRouter.get("/",businessController.getBusinessByCategory);
businessRouter.get("/:businessId",businessController.getBusinessById);
businessRouter.get("/:businessId/opinions", ratingsController.getRatingsByBusiness);
export {
    businessRouter
}