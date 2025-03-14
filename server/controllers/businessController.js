import { BusinessService } from '../service/businessService.js'
import { basicBusinessSchema, businessSchema } from '../validations/BusinessValidation.js'
import { createToken } from '../middleware/authenticateToken.js';
import { priceSchema } from '../validations/priceValidation.js';


export class BusinessController {
    static businessService = new BusinessService();
    async getBusinessByCategory(req, res, next) {
        try {
            const resultItem = await BusinessController.businessService.getBusinessByCategory(req.query);
            res.json({ data: resultItem });
        }
        catch (ex) {
            next({
                statusCode: ex.errno || 500
                , message: ex.message || ex
            })
        }
    }

    async getBusinessById(req, res, next) {
        try {
            const resultItem = await BusinessController.businessService.getBusinessById(req.params);
            res.json({ data: resultItem });
        }
        catch (ex) {
            next({
                statusCode: ex.errno || 500
                , message: ex.message || ex
            })
        }
    }

    async loginBusiness(req, res, next) {
        try {
            const { userDetails, businessDetails, priceOffers } = await BusinessController.businessService.loginBusiness(req.body);
            const token = createToken({ id: businessDetails.idBusiness });
            return res.cookie('x-access-token', token, { httpOnly: true, secure: true, maxAge: 259200000 })
                .json({ userName: userDetails.userName, businessDetails: businessDetails, priceOffers: priceOffers });
        } catch (ex) {
            next({
                statusCode: ex.errno || 500,
                message: ex.message || ex
            })
        }
    }

    async registerBusiness(req, res, next) {
        try {
            const { error } = basicBusinessSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }
            const idUser = await BusinessController.businessService.signUpBusiness(req.body);
            const token = createToken({ id: idUser });
            return res
                .cookie('x-access-token', token, { httpOnly: true, secure: true, maxAge: 259200000 })
                .json({ id: idUser });
        } catch (ex) {
            next({
                statusCode: ex.errno === 1062 ? 409 : 500,
                message: ex.message || ex
            });
        }
    }

    async verifyOtp(req, res, next) {
        try {
            const validate = await BusinessController.businessService.verifyBusinessSignUp(req.body);
            if (validate)
                return res.json({});
            else
                return res.status(401).json({ error: "The code entered is incorrect, please try again" });
        }
        catch (ex) {
            next({
                statusCode: ex.errno || 500,
                message: ex.message || ex
            })
        }
    }

    async addBUsiness(req, res, next) {
        try {
            const { error } = businessSchema.validate({ ...req.body.businessDetails, password: req.body.password });
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }
            req.body.priceOffers.map(price => {
                const { error } = priceSchema.validate(price);
                if (error) {
                    return res.status(400).json({ error: error.details[0].message });
                }
            })
            const idBusiness = await BusinessController.businessService.addBusiness(req.body);
            res.json({ data: idBusiness });
        } catch (ex) {
            next({
                statusCode: ex.errno || 500
                , message: ex.message || ex
            })
        }
    }

    async deleteBusiness(req, res, next) {
        try {
            await BusinessController.businessService.deleteBusiness(req.params);
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