import { LoginService } from '../service/loginService.js'
export class LoginController {
    static loginService=new LoginService();
    async login(req, res, next) {
        try {
            const {token, user} = await LoginController.loginService.checkUserIdExist(req.body);
            return res.cookie('x-access-token', token, { httpOnly: true }).json({ token: token, user: user });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex.message;
            next(err)
        }
    }
}