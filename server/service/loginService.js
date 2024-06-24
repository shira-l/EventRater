import {Queries} from './query.js'
export class LoginService{
    static queries = new Queries();
    static tableName="users";

    async checkUserIdExist(params) {
        const { email, password } = params;
        const columns = "userId, userName";
        const joinTables = [
            { table: 'passwords', condition: `users.id = passwords.userId` }
        ];
        const queryTest = Queries.getQuery(LoginService.tableName, params);
        const userRes = await executeQuery(queryTest, [username]);
        if (!userRes || password!== userRes[0].id )
            throw new Error("inavlid password ");

        const token = jwt.sign({ id: userRes[0].name }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '20m' });
        //const refreshtoken = jwt.sign({ id: userRes[0].name }, "keyrefresh", { expiresIn: '1d' });
       // return {token ,refreshtoken};
       return token;
    }

    //     const category = params.category;
    //     delete params.category;

    //     const conditions = {
    //         category: { table: 'category', column: 'categoryName', value: category }
    //     };

    //     const { query, values } = queries.getQuery(BusinessService.tableName, columns, joinTables, params, conditions);
    //     const result = await executeQuery(query, values);
    //     return result;




}