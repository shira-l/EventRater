
import { reviewSchema } from '../validations/reviewValidations.js';
import { ReviewService } from '../service/reviewService.js';
export class ReviewController {
    static reviewService = new ReviewService();

    async getReviewsByBusiness(req, res, next) {
        try {
            const resultItem = await ReviewController.reviewService.getReviewByBusiness(req.query);
            res.json({ data: resultItem });
        }
        catch (ex)  {
            next({
                statusCode: ex.errno || 500
                , message: ex.message || ex
            })
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
        catch (ex)  {
            next({
                statusCode: ex.errno || 500
                , message: ex.message || ex
            })
        }
    }

    async updateReview(req, res, next) {
        try {
            const { error } = reviewSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }
            const resultItem = await ReviewController.reviewService.updateReview(req.params, req.body);
            res.json({ data: resultItem });
        } catch (ex) {
            next({
                statusCode: ex.errno || 404,
                message: ex.message || ex
            })
        }
    }

    async deleteReview(req, res, next) {
        try {
            await ReviewController.reviewService.deleteReview(req.params);
            res.json({});
        }
        catch (ex) {
            next({
                statusCode: ex.errno || 404,
                message: ex.message || ex
            })
        }
    }
}