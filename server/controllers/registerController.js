import { RegisterService } from '../service/registerService.js';

export class RegisterController {
    static registerService = new RegisterService();

    async register(req, res, next) {
        try {
            const { token, user } = await RegisterController.registerService.createUser(req.body);
            return res
                .cookie('x-access-token', token, { httpOnly: true })
                .json({ token: token, user: user });
        } catch (ex) {
            const err = {};
            err.statusCode = 500;
            err.message = ex.message;
            next(err);
        }
    }
}