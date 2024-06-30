import { Queries } from "./query.js"
import executeQuery from './db.js';
import { generateOTP } from './otpService.js'
import { sendMailOtp } from "./emailService.js";

export class BusinessService {
    static tableName = "businesses";
    static queries = new Queries();
    async getBusinessByCategory(params) {
        const queries = new Queries();
        const columns = "idBusiness, businessName, locationName ,COUNT(idOpinion) AS opinionCount,AVG(rating) AS averageRating";
        const joinTables = [
            { table: 'categories', condition: `Businesses.category = categories.idCategory` },
            { table: 'locations', condition: `Businesses.location = locations.idLocation` },
            { table: 'opinions', condition: `businesses.idBusiness = opinions.businessId` }
        ];
        params["categoryName"] = params["category"];
        delete params["category"];
        params["isActive"] = true;
        const { query, values } = queries.getQuery(BusinessService.tableName, columns, joinTables, params);
        const result = await executeQuery(query, values);
        return result;
    }

    async getBusinessById(idParam) {
        //const columns=
        const { query, values } = Queries.getQuery(BusinessService.tableName, columns, idParam);
        const result = await executeQuery(query, values);
        return result;
    }
    //     const { encrypt, compare } = require('../services/crypto');
    // const { generateOTP } = require('../services/OTP');
    // const { sendMail } = require('../services/MAIL');


    async businessExist(email,columns) {
        const columns = columns||"1";
        const { query, values } = BusinessService.queries.getQuery(BusinessService.tableName, columns, [], { email: email, isActive: true });
        const users = await executeQuery(query, values);
        return users.length > 0;
    }
    async addBusiness(params) {
        const userQuery = BusinessService.queries.postQuery(BusinessService.tableName, params);
        const result = await executeQuery(userQuery.query, userQuery.values);
        return result.insertId;
    }
    async signUpBusiness(params) {
        const { email, businessName } = params;
        const isExisting = await this.businessExist(email);
        if (isExisting) {
            throw new Error("business already exists");
        }
        const otpGenerated = generateOTP();
        console.log(otpGenerated)
        try {
            await sendMailOtp({
                to: email,
                OTP: otpGenerated,
            });
            const businessId = await this.addBusiness({ email: email, businessName: businessName, otp: otpGenerated });
            return businessId
        } catch (error) {
            throw new Error('Unable to sign up, Please try again later', error);
        }

    }
    async verifyEmail(req, res) {
        const { email, otp } = req.body;
        const user = await validateUserSignUp(email, otp);
        res.send(user);
    }



    async validateUserSignUp(email, otp) {
        const userOtp = await businessExist(email,"otp")
        if (!userOtp) {
          throw new Error('business is not exists')
        }
        if (userOtp !== otp) {
           throw new Error('Invalid OTP');
        }
        const updatedUser = await User.findByIdAndUpdate(user._id, {
            $set: { active: true },
        });
        return [true, updatedUser];
    };
}