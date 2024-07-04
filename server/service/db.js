import mysql from 'mysql2';
import 'dotenv/config'
async function executeQuery(query, params) {
    console.log(query)
    console.log(params)
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            port: 8080,
            database: 'last_project',
            password: 'shiraAHRV3125!'
        });

        connection.connect(err => {
            if (err) {
                console.log("error:",err)
                reject(err);
                return;
            }

            connection.execute(query, params, (error, results) => {
                if (error) {
                    console.log("error:",error)
                    reject(error);
                    return;
                }

                resolve(results);
                connection.end();
            });
        });
    });
}


export default executeQuery;