
import { ReviewService } from '../service/reviewService.js';
export class EnumController {
    static reviewService = new ReviewService();

    async getEnum(req, res, next){
        try {
            const resultItem = await ReviewController.reviewService.getReviewByBusiness(req.params);
            res.status(200).json({ status: 200, data: resultItem });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

   
  
}
