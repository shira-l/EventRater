import executeQuery from './db.js';
import { getReviewByBusinessQuery } from "../queries/reviewQueries.js";
import { GenericQuery } from "../queries/generyQueries.js";

export class ReviewService {
    static tableName = "Reviews";

    async getReviewByBusiness(params) {
        const query = getReviewByBusinessQuery;
        const values = [params.businessId];
        const addQuery = GenericQuery.getAdvancedQuery(params);
        const result = await executeQuery(query + addQuery, values);
        return result;
    }

    async addReview(data) {
        const query = GenericQuery.postQuery(ReviewService.tableName, Object.keys(data));
        const result = await executeQuery(query, Object.values(data));
        return result.insertId;
    }

    async updateReview(params, data) {
        const query = GenericQuery.updateQuery(ReviewService.tableName, Object.keys(data), Object.keys(params));
        const values = [...Object.values(data), ...Object.values(params)];
        const result = await executeQuery(query, values);
        return result;
    }

    async deleteReview(idReview) {
        const { query, values } = GenericQuery.deleteQuery(ReviewService.tableName, idReview);
        const result = await executeQuery(query, values);
        return result;
    }
}