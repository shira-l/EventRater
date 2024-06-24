import {Queries} from "./query.js"
import executeQuery from './db.js';
import { CategoryService } from './categoryService.js';


export class BusinessService {
    static tableName = "Businesses";

    async getBusinessByCategory(params) {
        const categoryService = new CategoryService();
        const queries = new Queries();
        const DB = process.env.DB_NAME;
        const columns = "businessesName, averageRating, NumberOfOpinions";
        const joinTables = [
            { table: 'category', condition: `${DB}.Businesses.category = ${DB}.category.id` }
        ];
        // const conditions = { [`${DB}.category.categoryName`]: params.category };
        // const conditions = {
        //     categoryName: { table: 'category', column: 'categoryName', value: params.category }
        // };

        const { query, values } = queries.getQuery(BusinessService.tableName, columns, joinTables, params);
        const result = await executeQuery(query, values);
        return result;
    }

    async getBusinessById(idParam) {
                    //const columns=
        const { query, values } = Queries.getQuery(BusinessService.tableName, columns, idParam);
        const result = await executeQuery(query, values);
        return result;
    }
}