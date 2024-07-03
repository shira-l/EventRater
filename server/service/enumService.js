import {Queries} from "./query.js"
import executeQuery from './db.js';

export class ReviewService {
    static queries = new Queries();

    async getEnumValues(params) {
        const columns = "*";
        const { query, values } = ReviewService.queries.getQuery(params.enumType, columns, [],);
        const result = await executeQuery(query, values);
        return result;
    }

}