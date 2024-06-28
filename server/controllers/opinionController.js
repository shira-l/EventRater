import {OpinionService} from '../service/OpinionService.js'
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
            
            const businessId = req.query.businessId;

            const userId = req.userId;
            if (!userId) {
                return res.status(401).json({ message: "User ID is required" });
            }

            const newOpinion = { ...req.body, userId: userId, businessId: businessId };
            const resultItem = await OpinionController.opinionService.addOpinion(newOpinion);
            res.status(201).json({ status: 201, data: resultItem });
        }
        catch (ex) {
            const err = {};
            err.statusCode = 500;
            err.message = ex;
            next(err);
        }
    }
}