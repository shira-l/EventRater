import bcrypt from 'bcrypt';
import { Queries } from './query.js';

export class PasswordService {
    static queries = new Queries();
    static passwordsTable = "passwords";

    async addPassword(params) {
        params.password = await bcrypt.hash(params.password, 10);
        const passwordQuery = Queries.postQuery(PasswordService.passwordsTable, params);
        const result = await executeQuery(passwordQuery.query, passwordQuery.values);
        return result.insertId;
    }

    async verifyPassword(plainPassword, hashedPassword) {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }
}
