// import { Queries } from "./query.js";
import executeQuery from './db.js';
import { GenericQuery } from "../queries/generyQueries.js";

export class PriceService {
    static tableName = "prices";
    // static queries = new Queries();

    async getPricesByBusiness(params) {
        const columns = "itemDescription, itemPrice";
        const query = GenericQuery.getQuery(PriceService.tableName, columns, Object.keys(params));
        const result = await executeQuery(query, Object.values(params));
        return result;
    }

    async addPrice(data) {
        const { query, values } = GenericQuery.postQuery(PriceService.tableName, data);
        const result = await executeQuery(query, values);
        return result.insertId;
    }

    async deletePrice(priceId) {
        const query = GenericQuery.deleteQuery(PriceService.tableName, Object.keys(priceId));
        const result = await executeQuery(query, Object.values(priceId));
        return result;
    }
}