import {Queries} from "./query.js"
export class BusinessService {
static tableName = "Businesses";
    async getBusinessByCategory(params) {
        const queries = new Queries();
        const columns= "id, userId, businessType";
        const paramsValues = Object.values(params);
        const query = queries.getQuery(BusinessService.tableName, columns, params);
        const result = await executeQuery(query, paramsValues);
        return result;
    }

    async getBusinessById(idParam) {
                    //const columns=
        const query = Queries.getQuery(BusinessService.tableName, columns, idParam);
        const result = await executeQuery(query, [idParam.id]);
        return result;
    }
}