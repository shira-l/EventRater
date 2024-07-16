import { priceSchema } from '../validations/priceValidation.js';
import { PriceService } from '../service/priceService.js';

export class PriceController {
    static priceService = new PriceService();

    async getPricesByBusiness(req, res, next) {
        try {
            const resultItems = await PriceController.priceService.getPricesByBusiness(req.query);
            res.json({ data: resultItems });
        }
        catch (ex) {
            const err = {};
            err.statusCode = 500;
            err.message = ex.message;
            next(err);
        }
    }

    async addPrice(req, res, next) {
        try {
            const { error } = priceSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }
            const resultItem = await PriceController.priceService.addPrice(req.body);
            res.json({ data: resultItem });
        }
        catch (ex) {
            const err = {};
            err.statusCode = 500;
            err.message = ex.message;
            next(err);
        }
    }

    async deletePrice(req, res, next) {
        try {
            await PriceController.priceService.deletePrice(req.params);
            res.send();
        }
        catch (ex) {
            next({
                statusCode: ex.errno || 404,
                message: ex.message || ex
            })
        }
    }
}
