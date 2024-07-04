import { Queries } from "./query.js";
import executeQuery from './db.js';

export class PriceService {
    static tableName = "Prices";
    static queries = new Queries();

    async getPricesByBusiness(params) {
        const columns = "itemDescription, itemPrice";
        const { query, values } = PriceService.queries.getQuery(PriceService.tableName, columns, [], params);
        const result = await executeQuery(query, values);
        return result;
    }

    async addPrice(data) {
        const { query, values } = PriceService.queries.postQuery(PriceService.tableName, data);
        const result = await executeQuery(query, values);
        return result.insertId;
    }

    async deletePrice(priceId) {
        const { query, values } = PriceService.queries.deleteQuery(PriceService.tableName, priceId);
        const result = await executeQuery(query, values);
        return result;
    }
}