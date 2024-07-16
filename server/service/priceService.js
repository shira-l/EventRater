import executeQuery from './db.js';
import { GenericQuery } from "../queries/generyQueries.js";


export class PriceService {
    static tableName = "prices";

    async getPricesByBusiness(params) {
        const columns = "idPrice, itemDescription, itemPrice";
        const query = GenericQuery.getQuery(PriceService.tableName, columns, Object.keys(params));
        const result = await executeQuery(query, Object.values(params));
        return result;
    }

    async addPrice(data) {
        const query = GenericQuery.postQuery(PriceService.tableName,  Object.keys(data));
        const result = await executeQuery(query,  Object.values(data));
        return result.insertId;
    }

    async deletePrice(priceId) {
        const query = GenericQuery.deleteQuery(PriceService.tableName,  Object.keys(priceId));
        const result = await executeQuery(query,  Object.values(priceId));
        return result;
    }
}