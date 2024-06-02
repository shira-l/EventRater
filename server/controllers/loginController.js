import { TableService } from '../service/service.js'
export class LoginController {
    async checkUser(req, res, next) {
        try {
            let userName = req.query.userName;
            const loginService = new TableService();
            const resultItems = await loginService.checkUserName(userName)
            if (resultItems.length) {
                const err = {}
                err.statusCode = 400;
                err.message = "Already Exist";
                next(err)
            }
            else {
                return res.status(200).json({ status: 200 });
            }
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }
}