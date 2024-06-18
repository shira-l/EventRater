import { BusinessService } from '../service/businessService.js'
export class BusinessController {
    static businessService = new BusinessService();
    async getBusiness(req, res, next){
        try {
            const resultItem = await BusinessController.businessService.getBusinessByCategory(req.query);
            res.status(200).json({ status: 200, data: resultItem });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async getBusinessById(req, res, next){
        try {
            const resultItem = await BusinessController.businessService.getBusinessById(req.params);
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

{


}