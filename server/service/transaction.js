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
    let queries = new GenericQuery();
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();
        let businessQuery = queries.postQuery("businesses", [...Object.keys(data.businessDetails), "userId"])
        businessIdData = await connection.query(businessQuery, [...Object.values(data.businessDetails), data.userId]);
        data.priceOffers.map(async price => {
            let paramsOfPrice = {
                ...price,
                businessId: businessIdData[0].insertId
            };
            let priceQuery = queries.postQuery("prices", Object.keys(paramsOfPrice))
            await connection.query(priceQuery, Object.values(paramsOfPrice));
        })
        let passwordQuery = queries.postQuery("passwords", ["password"])
        let [passwordIdData] = await connection.query(passwordQuery, data.password);
        let paramsOfUser = {
            userName: data.userName,
            passwordId: passwordIdData.insertId,
            isActive: true
        }
        let userQuery = queries.updateQuery("users", Object.keys(paramsOfUser), ["idUser"])
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
    return businessIdData.insertId;
}
export { executeTransactionQuery };

// async function executeTransactionQuery(data) {
//     let businessIdData;
//     // let queries = new Queries();
//     let values = Object.values(data)
//     try {
//         connection = await pool.getConnection();
//         await connection.beginTransaction();
//         let businessQuery = GenericQuery.postQuery("business", values[0])
//         [businessIdData] = await connection.query(businessQuery.query, businessQuery.values);
//         let paramsOfPrice = { ...values[1], businessId: businessIdData.insertId };
//         let priceQuery = GenericQuery.postQuery("prices", paramsOfPrice)
//         await connection.query(priceQuery.query, priceQuery.values);
//         let userQuery = GenericQuery.updateQuery("users", { businessId: businessIdData.insertId }, { idUser: values[0].userId })
//         await connection.query(userQuery.query, userQuery.values)
//         await connection.commit();
//     } catch (error) {
//         if (connection) {
//             await connection.rollback();
//         }
//         throw error;
//     } finally {
//         if (connection) {
//             connection.release();
//         }
//     }
//     return businessIdData.insertId;
// }
// export { executeTransactionQuery };
