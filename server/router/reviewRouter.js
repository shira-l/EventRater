import express from "express";
import { ReviewController } from "../controllers/reviewController.js";
import {verifyToken} from '../middleware/authenticateToken.js'

const reviewRouter = express.Router();
const reviewController = new ReviewController();

reviewRouter.get("/", reviewController.getReviewsByBusiness);
reviewRouter.post("/:businessId", verifyToken, reviewController.addReview);
reviewRouter.delete("/:reviewId",verifyToken,reviewController.deleteReview);

export {
    reviewRouter
}