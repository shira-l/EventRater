import express from "express";
import { BusinessController } from '../controllers/businessController.js'
import { OpinionController } from "../controllers/opinionController.js";
import {verifyToken} from '../middleware/authenticateToken.js'

const businessRouter = express.Router();
const businessController = new BusinessController();
const opinionController = new OpinionController();

console.log("business router")
businessRouter.get("/",businessController.getBusinessByCategory);
businessRouter.get("/:category",businessController.getBusinessByCategory);

businessRouter.get("/:businessId/opinions", opinionController.getOpinionsByBusiness);
businessRouter.post("/:businessId/opinions", opinionController.addOpinion);


export {
    businessRouter
}