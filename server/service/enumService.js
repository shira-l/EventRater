import {Queries} from "./query.js"
import executeQuery from './db.js';

export class EnumService {
    static queries = new Queries();
    async getEnumValues(params) {
        const columns = "*";
        const { query, values } = EnumService.queries.getQuery(params.enumType, columns, [],);
        const result = await executeQuery(query, values);
        return result;
    }

}