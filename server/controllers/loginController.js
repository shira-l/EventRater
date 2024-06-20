import { TableService } from '../service/service.js'
export class LoginController {
    async loginTest(req, res, next) {
        try {
            const testService = new TestService();
            const token = await testService.getUserByPassword(req.body);
            return res.cookie('x-access-token', token, { httpOnly: true }).json({ token: token });

        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }
}