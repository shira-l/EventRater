import { Queries } from "./query.js"
import executeQuery from './db.js';



export class BusinessService {
    static tableName = "businesses";
    async getBusinessByCategory(params) {
        console.log("businesses service")
        const queries = new Queries();
        const DB = process.env.DB_NAME;
        const columns = "businesses.id,businesses.businessName,locations.location ";
        const joinTables = [
            { table: 'category', condition: `Businesses.category = category.id` },
            { table: 'locations', condition: `Businesses.location = locations.id` }
        ];

        const category = params.category;
        delete params.category;
        params["isActive"] = true;
        const conditions = {
            category: { table: 'category', column: 'categoryName', value: category }
        };

        const { query, values } = queries.getQuery(BusinessService.tableName, columns, joinTables, params, conditions);
        console.log(query)
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