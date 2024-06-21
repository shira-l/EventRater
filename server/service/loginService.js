import {Queries} from './query'
export class LoginService{
    static tableName="users";
    async checkUserIdExist(params) {
        const { email, password } = params;
        const queryTest = Queries.getQuery(LoginService.tableName,, params);
        const userRes = await executeQuery(queryTest, [username]);
        if (!userRes || password!== userRes[0].id )
            throw new Error("inavlid password ");

        const token = jwt.sign({ id: userRes[0].name }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '20m' });
        //const refreshtoken = jwt.sign({ id: userRes[0].name }, "keyrefresh", { expiresIn: '1d' });
       // return {token ,refreshtoken};
       return token;
    }




}