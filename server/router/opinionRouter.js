import express from "express";
import { OpinionController } from "../controllers/opinionController.js";
import {verifyToken} from '../middleware/authenticateToken.js'

const opinionRouter = express.Router();
const opinionController = new OpinionController();

opinionRouter.get("/", opinionController.getOpinionsByBusiness);
opinionRouter.post("/:businessId", verifyToken, opinionController.addOpinion);


export {
    opinionRouter
}