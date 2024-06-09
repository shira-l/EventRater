import { Queries } from "./query";
export class BusinessService {

    async getBusinessByCategory(params) {
            //const columns=
        const paramsValues = Object.values(params);
        const query = Queries.getQuery(tableName, columns, params);
        const result = await executeQuery(query, paramsValues);
        return result;
    }

    async getBusinessById(idParam) {
                    //const columns=
        const query = Queries.getQuery(tableName, columns, idParam);
        const result = await executeQuery(query, [idParam.id]);
        return result;
    }
}