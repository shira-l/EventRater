import bcrypt from 'bcrypt';
// import { Queries } from './query.js';
import executeQuery from './db.js';
import { GenericQuery } from "../queries/generyQueries.js";

export class PasswordService {
    // static queries = new Queries();
    static passwordsTable = "passwords";

    async addPassword(params) {
        params.password = await bcrypt.hash(params.password, 10);
        const passwordQuery = GenericQuery.postQuery(PasswordService.passwordsTable, params);
        console.log(params)
        const result = await executeQuery(passwordQuery.query, passwordQuery.values);
        // const passwordQuery = PasswordService.queries.postQuery(PasswordService.passwordsTable, Object.keys(params));
        // const result = await executeQuery(passwordQuery,Object.values(params));

        return result.insertId;
    }

    async verifyPassword(plainPassword, hashedPassword) {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }
}
