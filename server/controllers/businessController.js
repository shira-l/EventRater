import { BusinessService } from '../service/businessService.js'

export class BusinessController {
    static businessService = new BusinessService();
    async getBusinessByCategory(req, res, next){
        try {
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
    
    async addBusiness(req, res, next) {
        try {
            const { error } = userSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }

            const idUser = await LoginController.userService.registerUser(req.body);
            const token = createToken({ id: idUser });
            return res
                .cookie('x-access-token', token, { httpOnly: true })
                .json({ id: idUser });
        } catch (ex) {
            const err = {};
            err.statusCode = 500;
            err.message = ex.message;
            next(err);
        }
    }



}