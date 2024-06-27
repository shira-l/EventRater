import {OpinionService} from '../service/opinionService.js'
export class OpinionController {
    static opinionService = new OpinionService();
    async getOpinions(req, res, next){
        try {
            const resultItem = await OpinionController.opinionService.getOpinions(req.params);
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
}