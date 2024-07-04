import {Queries} from "./query.js"
import executeQuery from './db.js';

export class ReviewService {
    static tableName = "Reviews";
    static queries = new Queries();

    async getReviewByBusiness(params) {
        const columns = "idReview, rating, description, productionDate, userName";
        const joinTables = [
            { table: 'users', condition: `Users.idUser = Reviews.userId` },
        ];
        params["reviews.isActive"] = '1';
        const { query, values } = ReviewService.queries.getQuery(ReviewService.tableName, columns, joinTables, params);
        const result = await executeQuery(query, values);
        return result;
    }

    async addReview(data) {
        const { query, values } = ReviewService.queries.postQuery(ReviewService.tableName, data);
        const result = await executeQuery(query, values);
        return result.insertId;
    }
    async deleteReview(idReview) {
        const { query, values } = ReviewService.queries.deleteQuery(ReviewService.tableName, idReview);
        const result = await executeQuery(query, values);
        return result;
    }
}