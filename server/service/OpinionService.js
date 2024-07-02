import {Queries} from "./query.js"
import executeQuery from './db.js';

export class OpinionService {
    static tableName = "Opinions";
    static queries = new Queries();

    async getOpinionByBusiness(params) {
        const columns = "rating, description, productionDate, userName";
        const joinTables = [
            { table: 'users', condition: `Users.idUser = Opinions.userId` },
        ];
        const { query, values } = OpinionService.queries.getQuery(OpinionService.tableName, columns, joinTables, params);
        const result = await executeQuery(query, values);
        return result;
    }

    async addOpinion(data) {
        const { query, values } = OpinionService.queries.postQuery(OpinionService.tableName, data);
        const result = await executeQuery(query, values);
        return result.insertId;
    }
    async deleteOpinion(opinionId){
        const { query, values } = OpinionService.queries.deleteQuery(OpinionService.tableName, opinionId);
        const result = await executeQuery(query, values);
        return result;
    }
}