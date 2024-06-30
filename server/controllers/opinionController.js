import {OpinionService} from '../service/opinionService.js'
import { opinionSchema } from '../validations/opinionValidations.js';

export class OpinionController {
    static opinionService = new OpinionService();

    async getOpinionsByBusiness(req, res, next){
        try {
            const resultItem = await OpinionController.opinionService.getOpinionByBusiness(req.query);
            res.status(200).json({ status: 200, data: resultItem });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async getOpinionById(req, res, next){
        try {
            const resultItem = await OpinionController.opinionService.getOpinionById(req.params);
            res.status(200).json({ status: 200, data: resultItem });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async addOpinion(req, res, next) {
        try {
            const { error } = opinionSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }
            const resultItem = await OpinionController.opinionService.addOpinion(req.body);
            res.status(200).json({ status: 200, data: resultItem });
        }
        catch (ex) {
            const err = {};
            err.statusCode = 500;
            err.message = ex;
            next(err);
        }
    }
   async deleteOpinion(req, res, next){
    try {
     await OpinionController.opinionService.deleteOpinion(req.params);
    res.status(200).json({ status: 200 });
   }
   catch (ex) {
    const err = {};
    err.statusCode = 500;
    err.message = ex;
    next(err);
}
}  
}