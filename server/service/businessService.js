import executeQuery from './db.js';
import otpGenerator from 'otp-generator';
import { sendMailOtp } from "../utils/emailSend.js";
import { executeTransactionQuery } from './transaction.js'
import { UserService } from "./userService.js";
import { PriceService } from './priceService.js';
import { getBusinessByCategoryQuery, getBusinessByIdQuery } from "../queries/businessQueries.js";
import { GenericQuery } from "../queries/generyQueries.js";
import bcrypt from 'bcrypt';

export class BusinessService {
    static tableName = "businesses";
    async getBusinessByCategory(params) {
        let query = getBusinessByCategoryQuery;
        let values = [params.category];
        if (params.userName) {
            query += " AND userName LIKE ? ";
            values.push(`%${params.userName}%`);
        }
        if (params.locationName) {
            query += " AND locationName = ? ";
            values.push(params.locationName);
        }
        if (params.minPrice && params.maxPrice) {
            params.having = `NOT (MIN(itemPrice) > ? OR MAX(itemPrice) < ?)`;
            values.push(params.maxPrice, params.minPrice);
        }
        if (params.groupBy) {
            params.groupBy += `, businesses.idBusiness, users.userName, locations.locationName`
        } else {
            params.groupBy = `businesses.idBusiness, users.userName, locations.locationName`
        }

        const addQuery = GenericQuery.getAdvancedQuery(params);
        query += addQuery;
        const result = await executeQuery(query, values);
        return result;
    }


    async getBusinessById(params) {
        const query = getBusinessByIdQuery;
        const values = [params.idBusiness];
        const result = await executeQuery(query, values);
        return result;
    }
    async loginBusiness(params) {
        try {
            const userService = new UserService();
            const priceService = new PriceService()
            const userDetails = await userService.loginUser(params, true);
            console.log("userDetails", userDetails)
            const columns = "idBusiness,about, phone,category,location";
            const query = GenericQuery.getQuery(BusinessService.tableName, columns, ["userId"]);
            const values = [userDetails.idUser];
            const businessDetails = await executeQuery(query, values);
            // const [businessDetails] = await executeQuery(query, [userDetails.idUser]);
            const priceOffers = await priceService.getPricesByBusiness({ businessId: businessDetails.idBusiness })
            return { userDetails, businessDetails, priceOffers }
        }
        catch (error) {
            throw error
        }

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
        let compare = await bcrypt.compare(otp, userOtp[0].otp);
        return compare;
    };


    async businessActive(email) {
        const columns = "idUser,isActive";
        const userService = new UserService();
        const isActive = await userService.getUserByValue({ email: email, isBusiness: true }, columns)
        return isActive;
    }

    async addBusiness(data) {
        data.password = await bcrypt.hash(data.password, 10);
        const newBusinessId = await executeTransactionQuery(data);
        return newBusinessId;
    }

    async updateBusiness(data, conditions) {
        const query = GenericQuery.updateQuery(BusinessService.tableName, Object.keys(data), Object.keys(conditions));
        await executeQuery(query, [...Object.values(data), ...Object.values(conditions)]);
    }


    async deleteBusiness(businessId) {
        const query = GenericQuery.deleteQuery(BusinessService.tableName, Object.keys(businessId));
        const result = await executeQuery(query, Object.values(businessId));
        return result;
    }
}