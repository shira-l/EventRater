import express from "express";
import { EnumController } from "../controllers/enumController.js";

const enumRouter = express.Router();
const enumController = new EnumController();

enumRouter.get("/:enumType", enumController.getEnum);

export {
    enumRouter
}