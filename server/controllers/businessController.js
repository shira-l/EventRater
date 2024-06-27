import { BusinessService } from '../service/businessService.js'

export class BusinessController {
    static businessService = new BusinessService();
    async getBusinessByCategory(req, res, next){
        try {
            console.log("get businesses")
            const resultItem = await BusinessController.businessService.getBusinessByCategory(req.query);
            res.status(200).json({ status: 200, data: resultItem });
        }
        catch (ex) {
            const err = {
                statusCode: 500,
                message: ex.message
            };
            next(err)
        }
    }

    async getBusinessById(req, res, next){
        try {
            const resultItem = await BusinessController.businessService.getBusinessById(req.params);
            res.status(200).json({ status: 200, data: resultItem });
        }
        catch (ex) {
            const err = {
                statusCode: 500,
                message: ex.message
            };
            next(err)
        }
    }
}

{


}