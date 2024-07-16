import express from "express";
import { ReviewController } from "../controllers/reviewController.js";
import {verifyToken} from '../middleware/authenticateToken.js'

const reviewRouter = express.Router();
const reviewController = new ReviewController();

reviewRouter.get("/", reviewController.getReviewsByBusiness);
reviewRouter.post("/", verifyToken, reviewController.addReview);
reviewRouter.put("/",verifyToken, reviewController.updateReview);
reviewRouter.delete("/",verifyToken,reviewController.deleteReview);

export {
    reviewRouter
}