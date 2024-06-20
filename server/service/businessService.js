import {Queries} from "./query.js"
import executeQuery from './db.js';
import { CategoryService } from './categoryService.js';

export class BusinessService {
    static tableName = "Businesses";

    async getBusinessByCategory(params) {
        const categoryService = new CategoryService();
        const queries = new Queries();
        const columns = "id, userId, category, phone, email, about";
        const categoryId = await categoryService.getCategoryIdByName(params.category);
        const { query, values } = queries.getQuery(BusinessService.tableName, columns,  { category: categoryId });
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