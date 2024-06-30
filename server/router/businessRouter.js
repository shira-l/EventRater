import express from "express";
import { BusinessController } from '../controllers/businessController.js'

const businessRouter = express.Router();
const businessController = new BusinessController();

console.log("business router")
businessRouter.get("/",businessController.getBusinessByCategory);
businessRouter.get("/:category",businessController.getBusinessByCategory);
businessRouter.post("/",businessController.addBusiness)
export {
    businessRouter
}