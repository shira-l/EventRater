import { Queries } from './query.js';
import { createToken } from '../middleware/authenticateToken.js';
import { PasswordService } from './passwordService.js';
import executeQuery from './db.js';

export class UserService {
    static queries = new Queries();
    static table = "users";

    async userExists(email, userName) {
        const columns = "1";
        const {query, values} = UserService.queries.getQuery(UserService.table, columns, [], { email: email, userName: userName });
        const users = await executeQuery(query, values);
        return users.length > 0;
    }

    async addUser(params) {
        const userQuery = UserService.queries.postQuery(UserService.table, params);
        const result = await executeQuery(userQuery.query, userQuery.values);
        return result.insertId;
    }

    async registerUser(params) {
        const { email, userName, password } = params;
        const userExists = await this.userExists(email, userName);

        if (userExists) {
            throw new Error("User already exists");
        }

        const passwordService = new PasswordService();
        const passwordId = await passwordService.addPassword(table, { password: password });
        const userId = await this.addUser({ email: email, userName: userName, passwordId: passwordId });

        if (!userId) {
            throw new Error("Failed to create user");
        }

        const token = createToken({ id: userId });

        return { token, userId };
    }

    async loginUser(userName, password) {
        const columns = "idUser, userName, password";
        const joinTables = [
            { table: 'passwords', condition: `users.passwordId = passwords.idPassword` }
        ];
        const {query, values} = UserService.queries.getQuery(UserService.table, columns, joinTables, { userName: userName });

        const users = await executeQuery(query, values);
        if (!users || users.length === 0) {
            throw new Error("Invalid username or password");
        }

        const passwordService = new PasswordService();
        const isMatch = await passwordService.verifyPassword(password, users[0].password);
        if (!isMatch) {
            throw new Error("Invalid username or password");
        }

        const token = createToken({ id: users[0].userId });

        return { token, user: users[0] };
    }
}
