import express from "express";
import { BusinessController } from '../controllers/businessController.js'
import { verifyToken } from "../middleware/authenticateToken.js";
const businessRouter = express.Router();
const businessController = new BusinessController();

console.log("business router")
businessRouter.get("/:idBusiness",businessController.getBusinessById);
businessRouter.get("/",businessController.getBusinessByCategory);
businessRouter.post("/",businessController.addBusiness);
businessRouter.post("/verify",businessController.verifyOtp);

export {
    businessRouter
}