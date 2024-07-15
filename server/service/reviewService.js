// import {Queries} from "./query.js"
import executeQuery from './db.js';
import { getReviewByBusinessQuery } from "../queries/reviewQueries.js";
import { GenericQuery } from "../queries/generyQueries.js";

export class ReviewService {
    static tableName = "Reviews";
    // static queries = new Queries();

    async getReviewByBusiness(params) {
        const query = getReviewByBusinessQuery;
        const values = [params.businessId];
        const result = await executeQuery(query, values);
        //להוסיף Limit
        return result;
    }

    async addReview(data) {
        const { query, values } = GenericQuery.postQuery(ReviewService.tableName, data);
        const result = await executeQuery(query, values);
        return result.insertId;
    }

    async updateReview(params, data) {
        const { query, values } = GenericQuery.updateQuery(ReviewService.tableName, data, params);
        const result = await executeQuery(query, values);
        return result;
    }

    async deleteReview(idReview) {
        const { query, values } = GenericQuery.deleteQuery(ReviewService.tableName, idReview);
        const result = await executeQuery(query, values);
        return result;
    }
}