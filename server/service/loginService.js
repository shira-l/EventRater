import {Queries} from './query.js'
import { createToken } from '../middleware/authenticateToken.js';

export class LoginService{
    static queries = new Queries();
    static tableName="users";

    async checkUserIdExist(params) {
        const columns = "userId, userName";
        const joinTables = [
            { table: 'passwords', condition: `users.id = passwords.userId` }
        ];
        const queryTest = Queries.getQuery(LoginService.tableName, columns, joinTables, params);

        const userRes = await executeQuery(queryTest, [username]);
        if (!userRes || userRes.length === 0)
            throw new Error("inavlid password ");

        const token = createToken({ id: userRes[0].userId });

       return {token, user: userRes[0]};
    }

}