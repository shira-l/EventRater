import { BusinessService } from '../service/businessService.js'
import { basicBusinessSchema } from '../validations/BusinessValidation.js'
import { createToken } from '../middleware/authenticateToken.js';

export class BusinessController {
    static businessService = new BusinessService();
    async getBusinessByCategory(req, res, next) {
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

    async getBusinessById(req, res, next) {
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
            console.log(req.body)
            const { error } = basicBusinessSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }
            const idUser = await BusinessController.businessService.signUpBusiness(req.body);
            const token = createToken({ id: idUser });
            return res
                .cookie('x-access-token', token, { httpOnly: true, secure: true, maxAge: 259200000 })
                .json({ id: idUser });
        } catch (ex) {
            const err = {};
            err.statusCode = 500;
            err.message = ex.message;
            next(err);
        }
    }
    async verifyOtp(req, res, next) {
        try { 
            console.log("controller otp")
             await BusinessController.businessService.verifyUserSignUp(req.body);
            res.status(200).json({ status: 200 });
         }
         catch (ex) {
            const err = {};
            err.statusCode = 500;
            err.message = ex.message;
            next(err);
        }
    }
    async deleteBusiness(req, res, next) {
        try {
            await BusinessController.businessService.deleteBussiness(req.params);
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