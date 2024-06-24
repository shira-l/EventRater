import {Queries} from "./query.js"
import executeQuery from './db.js';
import { CategoryService } from './categoryService.js';

export class BusinessService {
    static queries = new Queries();
    static tableName = "Businesses";

    async getBusinessByCategory(params) {
        const columns = "businessesName, averageRating, NumberOfOpinions";
        const joinTables = [
            { table: 'category', condition: `Businesses.category = category.id` }
        ];

        const category = params.category;
        delete params.category;

        const conditions = {
            category: { table: 'category', column: 'categoryName', value: category }
        };

        const { query, values } = BusinessService.queries.getQuery(BusinessService.tableName, columns, joinTables, params, conditions);
        const result = await executeQuery(query, values);
        return result;
    }

    // async getBusinessById(idParam) {
    //                 //const columns=
    //     const { query, values } = Queries.getQuery(BusinessService.tableName, columns, idParam);
    //     const result = await executeQuery(query, values);
    //     return result;
    // }
}