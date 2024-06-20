import {Queries} from "./query.js"
import executeQuery from './db.js';

export class UsersService {
    static tableName = "users";

    async getUserById(params) {
        const queries = new Queries();
        const columns = "id";
        const { query, values } = queries.getQuery(CategoryService.tableName, columns, { categoryName: categoryName });
        const result = await executeQuery(query, values);
        if (result.length > 0) {
            return result[0].id;
        } else {
            throw new Error(`Category ${categoryName} not found`);
        }
    }
}
