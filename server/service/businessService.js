import { Queries } from "./query.js"
import executeQuery from './db.js';
import otpGenerator from 'otp-generator';
import { sendMailOtp } from "../utils/emailSend.js";
import {executeTransactionQuery} from './transaction.js'
import { UserService } from "./userService.js";
import bcrypt from 'bcrypt';
export class BusinessService {
    static tableName = "businesses";
    static queries = new Queries();
    async getBusinessByCategory(params) {
        const columns = "idBusiness, userName, locationName, COUNT(idReview) AS reviewCount,AVG(rating) AS averageRating, MIN(prices.itemPrice) AS minPrice, MAX(prices.itemPrice) AS maxPrice";
        const joinTables = [
            { table: 'categories', condition: `Businesses.category = categories.idCategory` },
            { table: 'locations', condition: `Businesses.location = locations.idLocation` },
            { table: 'reviews', condition: `businesses.idBusiness = reviews.businessId` },
            { table: 'users', condition: `businesses.userId = users.idUser` },
            { table: 'prices', condition: `businesses.idBusiness = prices.businessId` }
        ];
        params["users.isActive"] = '1';
        params["categoryName"] = params["category"];
        delete params["category"];
        params["users.isActive"] = '1';
        const { query, values } = BusinessService.queries.getQuery(BusinessService.tableName, columns, joinTables, params, "idBusiness");
        const result = await executeQuery(query, values);
        return result;
    }

    async getBusinessById(params) {
        const columns = "about, email, phone";
        const joinTables = [
            { table: 'users', condition: `businesses.userId = users.idUser` }
        ];
        const { query, values } = BusinessService.queries.getQuery(BusinessService.tableName, columns, joinTables, params);
        const result = await executeQuery(query, values);
        return result;
    }

    async signUpBusiness(params) {
        const { email, userName } = params;
        const business = await this.businessActive(email);
        if (business.length && business[0].isActive) {
            throw new Error("business already exists");
        }
        const otpGenerated = otpGenerator.generate(6, {
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false,
        });
        try {
            await sendMailOtp({ to: email, OTP: otpGenerated, name: userName });
            const userService = new UserService();
            const hashOTP = await bcrypt.hash(otpGenerated, 10);
            let idUser;
            if (business.length) {
                await userService.updateUser({ otp: hashOTP }, { email: email, isBusiness: true })
                idUser = business[0].idUser
            }
            else {
                const newBusiness = { email: email, userName: userName, isBusiness: true, otp: hashOTP };
                idUser = await userService.addUser(newBusiness);
            }
            return idUser

        } catch (error) {
            throw new Error('Unable to sign up, Please try again later', error);
        }

    }
    async verifyBusinessSignUp(params) {
        const { userId, otp } = params;
        const userService = new UserService();
        const columns = "otp"
        const userOtp = await userService.getUserByValue({ idUser: userId, isBusiness: true }, columns)
        if (!userOtp.length) {
            throw new Error('business is not exists')
        }
        let compare=await bcrypt.compare(otp,userOtp[0].otp);
       return compare;
    };


    async businessActive(email) {
        const columns = "idUser,isActive";
        const userService = new UserService();
        const isActive = await userService.getUserByValue({ email: email, isBusiness: true }, columns)
        return isActive;
    }

    async addBusiness(data) {
        const newBusinessId = await executeTransactionQuery(data);
        return newBusinessId;
    }

    async updateBusiness(data, conditions) {
        const { query, values } = BusinessService.queries.updateQuery(BusinessService.tableName, data, conditions);
        await executeQuery(query, values);
    }


    async deleteBusiness(businessId) {
        const { query, values } = BusinessService.queries.deleteQuery(BusinessService.tableName, businessId);
        const result = await executeQuery(query, values);
        return result;
    }
}