
import {EnumService} from '../service/enumService.js'
export class EnumController {
    static enumService = new EnumService();

    async getEnum(req, res, next){
        try {
            const resultItem = await EnumController.enumService.getEnumValues(req.params);
            res.json({ data: resultItem });
        }
        catch (ex)  {
            next({
                statusCode: ex.errno || 500
                , message: ex.message || ex
            })
        }
    }
    
}
