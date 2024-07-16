import executeQuery from './db.js';
import { GenericQuery } from "../queries/generyQueries.js";

export class EnumService {
    async getEnumValues(params) {
        const columns = "*";
        const query = GenericQuery.getQuery(params.enumType, Object.keys(columns));
        const result = await executeQuery(query, Object.values(params));
        return result;
    }

}