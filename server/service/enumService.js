// import {Queries} from "./query.js"
import executeQuery from './db.js';
import { GenericQuery } from "../queries/generyQueries.js";

export class EnumService {
    // static queries = new Queries();
    async getEnumValues(params) {
        const columns = "*";
        const { query, values } = GenericQuery.getQuery(params.enumType, columns);
        const result = await executeQuery(query, values);
        return result;
    }

}