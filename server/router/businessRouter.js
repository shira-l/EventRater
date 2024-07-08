import express from "express";
import { BusinessController } from '../controllers/businessController.js'
import { verifyToken } from "../middleware/authenticateToken.js";
const businessRouter = express.Router();
const businessController = new BusinessController();

console.log("business router")
businessRouter.get("/:idBusiness",businessController.getBusinessById);
businessRouter.get("/",businessController.getBusinessByCategory);
businessRouter.post("/",verifyToken,businessController.addBUsiness)
businessRouter.post("/register",businessController.registerBusiness);
businessRouter.post("/verify",businessController.verifyOtp);

export {
    businessRouter
}