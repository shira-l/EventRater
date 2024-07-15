import mysql from 'mysql2/promise';
import 'dotenv/config';
// import { Queries } from './query.js';
import { GenericQuery } from "../queries/generyQueries.js";
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    port: 8080,
    database: process.env.DB_NAME,
    password: process.env.PASSWORD,
});

async function executeTransactionQuery(data) {
    let businessIdData;
    // let queries = new Queries();
    let values = Object.values(data)
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();
        let businessQuery = GenericQuery.postQuery("business", values[0])
        [businessIdData] = await connection.query(businessQuery.query, businessQuery.values);
        let paramsOfPrice = { ...values[1], businessId: businessIdData.insertId };
        let priceQuery = GenericQuery.postQuery("prices", paramsOfPrice)
        await connection.query(priceQuery.query, priceQuery.values);
        let userQuery = GenericQuery.updateQuery("users", { businessId: businessIdData.insertId }, { idUser: values[0].userId })
        await connection.query(userQuery.query, userQuery.values)
        await connection.commit();
    } catch (error) {
        if (connection) {
            await connection.rollback();
        }
        throw error;
    } finally {
        if (connection) {
            connection.release();
        }
    }
    return businessIdData.insertId;
}
export { executeTransactionQuery };
