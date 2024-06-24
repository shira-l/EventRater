import { Queries } from './query.js';
import { createToken } from '../middleware/authenticateToken.js';
import bcrypt from 'bcrypt';

export class RegisterService {
    static queries = new Queries();
    static tableName = "users";

    async createUser(params) {
        const { email, username, password } = params;

        columns = "1";
        
        const checkUserQuery = Queries.getQuery(LoginService.tableName, columns, [], {email: email, username: username});


        const existingUser = await executeQuery(checkUserQuery, [email, username]);

        if (existingUser.length > 0) {
            throw new Error("User already exists");
        }

        const insertUserQuery = `INSERT INTO ${RegisterService.tableName} (email, userName, password) VALUES (?, ?, ?)`;
        await executeQuery(insertUserQuery, [email, username, password]);

        const columns = "userId, email, userName";
        const queryTest = Queries.getQuery(RegisterService.tableName, columns, [], { email });
        const userRes = await executeQuery(queryTest, [email]);

        if (!userRes || userRes.length === 0) {
            throw new Error("Failed to create user");
        }

        const user = userRes[0];
        const token = createToken({ id: user.userId });

        return { token, user }; // מחזיר את הטוקן ואת נתוני המשתמש
    }
}