import express from "express";
import { BusinessController } from '../controllers/businessController.js'
const businessRouter = express.Router();
const businessController = new BusinessController();
businessRouter.get("/",businessController.getBusiness);
businessRouter.get("/:id",businessController.getBusinessById);

businessRouter.post("/", )
export {
    businessRouter
}