
import { reviewSchema } from '../validations/reviewValidations.js';
import { ReviewService } from '../service/reviewService.js';
export class ReviewController {
    static reviewService = new ReviewService();

    async getReviewsByBusiness(req, res, next){
        try {
            const resultItem = await ReviewController.reviewService.getReviewByBusiness(req.query);
            res.json({ data: resultItem });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async getReviewById(req, res, next){
        try {
            const resultItem = await ReviewController.reviewService.getReviewById(req.params);
            res.json({  data: resultItem });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async addReview(req, res, next) {
        try {
            const { error } = reviewSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }
            const resultItem = await ReviewController.reviewService.addReview(req.body);
            res.json({ data: resultItem });
        }
        catch (ex) {
            const err = {};
            err.statusCode = 500;
            err.message = ex;
            next(err);
        }
    }
    
    async updateReview(req, res, next) {
        try {
            const { error } = reviewSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }
            const resultItem = await ReviewController.reviewService.updateReview(req.query, req.body);
            res.json({ data: resultItem });
        } catch (ex) {
            const err = {};
            err.statusCode = 500;
            err.message = ex;
            next(err);
        }
    }
    
   async deleteReview(req, res, next){
    try {
     await ReviewController.reviewService.deleteReview(req.query);
    res.json({});
   }
   catch (ex) {
    const err = {};
    err.statusCode = 500;
    err.message = ex;
    next(err);
}
}  
}