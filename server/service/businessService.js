import { Queries } from "./query.js"
import executeQuery from './db.js';
import otpGenerator from 'otp-generator';
import { sendMailOtp } from "../utils/emailSend.js";
import { UserService } from "./userService.js";
import bcrypt from 'bcrypt';
export class BusinessService {
    static tableName = "businesses";
    static queries = new Queries();
    async getBusinessByCategory(params) {
        const columns = "idBusiness, userName, locationName ,COUNT(idOpinion) AS opinionCount,AVG(rating) AS averageRating";
        const joinTables = [
            { table: 'categories', condition: `Businesses.category = categories.idCategory` },
            { table: 'locations', condition: `Businesses.location = locations.idLocation` },
            { table: 'opinions', condition: `businesses.idBusiness = opinions.businessId` },
            { table: 'users', condition: `businesses.userId = users.idUser` }
        ];
        params["categoryName"] = params["category"];
        delete params["category"];
        params["isActive"] = true;
        const { query, values } = BusinessService.queries.getQuery(BusinessService.tableName, columns, joinTables, params, "idBusiness");
        const result = await executeQuery(query, values);
        return result;
    }

    async getBusinessById(idParam) {
        //const columns=
        const { query, values } = BusinessService.queries.getQuery(BusinessService.tableName, columns, idParam);
        const result = await executeQuery(query, values);
        return result;
    }
    //     const { encrypt, compare } = require('../services/crypto');
    // const { generateOTP } = require('../services/OTP');
    // const { sendMail } = require('../services/MAIL');
    async signUpBusiness(params) {
        const { email, userName } = params;
        const isExisting = await this.businessExist(email);
        if (isExisting) {
            throw new Error("business already exists");
        }
        const otpGenerated = otpGenerator.generate(6, {
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false,
        });
        try {
            await sendMailOtp({
                to: email,
                OTP: otpGenerated,
                name: userName
            });
            const userService = new UserService();
            const hashOTP = await bcrypt.hash(otpGenerated, 10);
            const newBusiness = { email: email, userName: userName, isBusiness: true, otp: hashOTP };
            const idUser = await userService.addUser(newBusiness);
            return idUser
        } catch (error) {
            throw new Error('Unable to sign up, Please try again later', error);
        }

    }

    async businessExist(email) {
        const columns = "1";
        const joinTables = [{ table: 'users', condition: `businesses.userId = users.idUser` }];
        const { query, values } = BusinessService.queries.getQuery(BusinessService.tableName, columns, joinTables, { email: email, isBusiness: true, isActive: true });
        const users = await executeQuery(query, values);
        return users.length > 0;
    }
    async addBusiness(params) {
        const userQuery = BusinessService.queries.postQuery(BusinessService.tableName, params);
        const result = await executeQuery(userQuery.query, userQuery.values);
        return result.insertId > 0;
    }

    async verifyEmail(req, res) {
        const { email, otp } = req.body;
        const user = await this.validateUserSignUp(email, otp);
        res.send(user);
    }



    async validateUserSignUp(email, otp) {
        const userOtp = await this.businessExist(email, "otp")
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
    async deleteBusiness(businessId) {
        const { query, values } = BusinessService.queries.deleteQuery(BusinessService.tableName, businessId);
        const result = await executeQuery(query, values);
        return result;
    }
}