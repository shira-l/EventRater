import mysql from 'mysql2/promise';
import 'dotenv/config';
import { GenericQuery } from "../queries/generyQueries.js";
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    port: 8080,
    database: process.env.DB_NAME,
    password: process.env.PASSWORD,
});

async function executeTransactionQuery(data) {
    let businessIdData, connection;
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();
        let businessQuery = GenericQuery.postQuery("businesses", [...Object.keys(data.businessDetails), "userId"])
        businessIdData = await connection.query(businessQuery, [...Object.values(data.businessDetails), data.userId]);
        console.log(businessIdData);
        data.priceOffers.map(async price => {
            let paramsOfPrice = {
                ...price,
                businessId: businessIdData[0].insertId
            };
            let priceQuery = GenericQuery.postQuery("prices", Object.keys(paramsOfPrice))
            await connection.query(priceQuery, Object.values(paramsOfPrice));
        })
        let passwordQuery = GenericQuery.postQuery("passwords", ["password"])
        let [passwordIdData] = await connection.query(passwordQuery, data.password);
        console.log(passwordIdData);
        let paramsOfUser = {
            userName: data.userName,
            passwordId: passwordIdData.insertId,
            isActive: true
        }
        let userQuery = GenericQuery.updateQuery("users", Object.keys(paramsOfUser), ["idUser"])
        await connection.query(userQuery, [...Object.values(paramsOfUser), data.userId])
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
    return businessIdData[0].insertId;
}
export { executeTransactionQuery };