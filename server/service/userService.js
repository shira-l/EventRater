import { Queries } from './query.js';
import { PasswordService } from './passwordService.js';
import executeQuery from './db.js';

export class UserService {
    static queries = new Queries();
    static table = "users";

    async registerUser(params) {
        const { email, userName, password } = params;
        const userExists = await this.userExists(email);
        if (userExists) {
            throw new Error("User already exists");
        }
        const passwordService = new PasswordService();
        const passwordId = await passwordService.addPassword({ password: password });
        const newUser = { email: email, userName: userName, passwordId: passwordId, isActive: true }
        const userId = await this.addUser(newUser);

        if (!userId) {
            throw new Error("Failed to create user");
        }
        return userId;
    }

    async loginUser(params) {
        const email = params.email;
        const password = params.password;
        const columns = "idUser, userName, password";
        const joinTables = [
            { table: 'passwords', condition: `users.passwordId = passwords.idPassword` }
        ];
        const { query, values } = UserService.queries.getQuery(UserService.table, columns, joinTables, { email: email, isBusiness: false });

        const users = await executeQuery(query, values);
        if (!users || users.length === 0) {
            throw new Error("Invalid username or password");
        }

        const passwordService = new PasswordService();
        const isMatch = await passwordService.verifyPassword(password, users[0].password);
        if (!isMatch) {
            throw new Error("Invalid username or password");
        }
        delete users[0].password
        return users[0];
    }
    async userExists(email) {
        const columns = "1";
        const { query, values } = UserService.queries.getQuery(UserService.table, columns, [], { email: email, isBusiness: false, isActive: true });
        const users = await executeQuery(query, values);
        return users.length > 0;
    }

    async addUser(params) {
        const userQuery = UserService.queries.postQuery(UserService.table, Object.keys(params));
        const result = await executeQuery(userQuery,Object.values(params) );
        return result.insertId;
    }
    async updateUser(data, conditions) {
        const query = UserService.queries.updateQuery(UserService.table, Object.keys(data), Object.keys(conditions));
        await executeQuery(query, [...Object.values(data), ...Object.values(conditions)]);
    }
    async getUserByValue(value, columns) {
        const { query, values } = UserService.queries.getQuery(UserService.table, columns, [], value);
        const result = await executeQuery(query, values);
        return result;
    }
}
