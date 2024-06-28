import { Queries } from "./query.js"
import executeQuery from './db.js';



export class BusinessService {
    static tableName = "businesses";

    async getBusinessByCategory(params) {
        const queries = new Queries();
        const columns = "idBusiness, businessName, locationName ,COUNT(idOpinion),AVERAGE(rating)";
        const joinTables = [
            { table: 'categories', condition: `Businesses.category = categories.idCategory` },
            { table: 'locations', condition: `Businesses.location = locations.idLocations` },
            { table: 'opinions', condition: `businesses.idBusiness = opinions.businessId` }
        ];
        params["categoryName"]=params["category"];
        delete params["category"];
        params["isActive"] = true;
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