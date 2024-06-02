import express from "express";
import { BusinessController } from '../controllers/businessController.js'
const businessRouter = express.Router();
const businessController = new BusinessController();
businessRouter.post("/", )
export {
    businessRouter
}