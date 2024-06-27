import {Queries} from "./query.js"
import executeQuery from './db.js';

export class OpinionService {
    static tableName = "Opiniones";
    static queries = new Queries();

    async getOpinionByBusiness(params) {
        const columns = "rating, description, userName, productionDate";
        const joinTables = [
            { table: 'users', condition: `Users.idUser = Opiniones.userId` },
        ];
        const { query, values } = OpinionService.queries.getQuery(BusinessService.tableName, columns, joinTables, params);
        const result = await executeQuery(query, values);
        return result;
    }
}