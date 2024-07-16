import bcrypt from 'bcrypt';
import executeQuery from './db.js';
import { GenericQuery } from "../queries/generyQueries.js";

export class PasswordService {
    static passwordsTable = "passwords";

    async addPassword(params) {
        params.password = await bcrypt.hash(params.password, 10);
        const passwordQuery = GenericQuery.postQuery(PasswordService.passwordsTable, Object.keys(params));
        const result = await executeQuery(passwordQuery, Object.values(params));
        return result.insertId;
    }

    async verifyPassword(plainPassword, hashedPassword) {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }
}
