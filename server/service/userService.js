// import { Queries } from './query.js';
import { PasswordService } from './passwordService.js';
import executeQuery from './db.js';
import { GenericQuery } from "../queries/generyQueries.js";
import { loginUserQuery } from "../queries/userQueries.js";
// import { object } from 'joi';

export class UserService {
    // static queries = new Queries();
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

    async loginUser(params,idBusiness) {
        const query = loginUserQuery(idBusiness);
        const email = params.email;
        const password = params.password;
        const users = await executeQuery(query, [email]);
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
        const query = GenericQuery.getQuery(UserService.table, columns, [email, isBusiness, isActive]);
        const values = [ email, false, true];
        const users = await executeQuery(query, values);
        return users.length > 0;
    }

    async addUser(params) {
        const userQuery = GenericQuery.postQuery(UserService.table, Object.keys(params));
        const result = await executeQuery(userQuery, Object.values(params));
        return result.insertId;
    }

    async updateUser(data, conditions) {
        console.log("update",data)
        const query = GenericQuery.updateQuery(UserService.table, Object.keys(data), Object.keys(conditions));
        await executeQuery(query, [...Object.values(data), ...Object.values(conditions)]);
    }

    async getUserByValue(value, columns) {
        const query = GenericQuery.getQuery(UserService.table, columns, Object.keys(value));
        const result = await executeQuery(query, Object.values(value));
        return result;
    }
}
