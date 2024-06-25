import { Queries } from './query.js';
import { createToken } from '../middleware/authenticateToken.js';
import bcrypt from 'bcrypt';

export class RegisterService {
    static queries = new Queries();
    static tableName = "users";

    async checkIfUserExists(email, username) {
        const columns = "1";
        const checkUserQuery = Queries.getQuery(RegisterService.tableName, columns, [], { email, userName: username });
        const existingUser = await executeQuery(checkUserQuery.query, checkUserQuery.values);
        return existingUser.length > 0;
    }

    async insertUser(params) {
        const userQuery = Queries.postQuery(RegisterService.usersTable, params);
        const result = await executeQuery(userQuery.query, insertUserQuery.values);
        return result.insertId;
    }

    async insertPassword(params) {
        params.password = await bcrypt.hash(params.password, 10);
        const passwordQuery = Queries.postQuery(RegisterService.passwordsTable, params);
        const result = await executeQuery(passwordQuery.query, insertPasswordQuery.values);
        return result.insertId;
    }

    async createUser(params) {
        const { email, username, password } = params;

        const userExists = await this.checkIfUserExists({email: email, username: username});
        if (userExists) {
            throw new Error("User already exists");
        }

        const passwordId = await this.insertPassword({password: password});
        const userId = await this.insertUser({email: email, username: username, passwordId: passwordId});

        if (!userId) {
            throw new Error("Failed to create user");
        }

        const token = createToken({ id: user.userId });

        return { token, userId };
    }

}