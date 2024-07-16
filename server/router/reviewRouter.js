import express from "express";
import { ReviewController } from "../controllers/reviewController.js";
import {verifyToken} from '../middleware/authenticateToken.js'

const reviewRouter = express.Router();
const reviewController = new ReviewController();

reviewRouter.get("/", reviewController.getReviewsByBusiness);
reviewRouter.post("/", verifyToken, reviewController.addReview);
reviewRouter.put("/:idReview",verifyToken, reviewController.updateReview);
reviewRouter.delete("/:idReview",verifyToken,reviewController.deleteReview);

export {
    reviewRouter
}