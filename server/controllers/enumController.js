
import {EnumService} from '../service/enumService.js'
export class EnumController {
    static enumService = new EnumService();

    async getEnum(req, res, next){
        try {
            const resultItem = await EnumController.enumService.getEnumValues(req.params);
            res.json({ data: resultItem });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }
    
}
