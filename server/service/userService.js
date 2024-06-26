import { Queries } from './query.js';
import { createToken } from '../middleware/authenticateToken.js';
import { PasswordService } from './passwordService.js';

export class UserService {
    static queries = new Queries();
    static usersTable = "users";

    async userExists(email, username) {
        const columns = "1";
        const {query, values} = Queries.getQuery(UserService.usersTable, columns, [], { email: email, userName: username });
        const users = await executeQuery(query, values);
        return users.length > 0;
    }

    async addUser(params) {
        const userQuery = Queries.postQuery(UserService.usersTable, params);
        const result = await executeQuery(userQuery.query, userQuery.values);
        return result.insertId;
    }

    async registerUser(params) {
        const { email, username, password } = params;
        const userExists = await this.userExists(email, username);

        if (userExists) {
            throw new Error("User already exists");
        }

        const passwordService = new PasswordService();
        const passwordId = await passwordService.addPassword({ password: password });
        const userId = await this.addUser({ email: email, username: username, passwordId: passwordId });

        if (!userId) {
            throw new Error("Failed to create user");
        }

        const token = createToken({ id: userId });

        return { token, userId };
    }

    async loginUser(username, password) {
        const columns = "userId, userName, password";
        const joinTables = [
            { table: 'passwords', condition: `users.id = passwords.userId` }
        ];
        const {query, values} = Queries.getQuery(UserService.usersTable, columns, joinTables, { userName: username });

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
