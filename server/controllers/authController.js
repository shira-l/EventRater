import { UserService } from '../service/userService.js'
import { userSchema } from '../validations/userValidations.js';
import { createToken } from '../middleware/authenticateToken.js';


export class LoginController {
    static userService = new UserService();
    async login(req, res, next) {
        try {
            const user = await LoginController.userService.loginUser(req.body, false);
            const token = createToken({ id: user.idUser });
            return res.cookie('x-access-token', token, { httpOnly: true, secure: true, maxAge: 259200000 }).json({ user: user });
        }
        catch (ex) {
            next({
                statusCode: ex.errno || 500,
                message: ex.message || ex
            })
        }
    }

    async register(req, res, next) {
        try {
            const { error } = userSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }

            const idUser = await LoginController.userService.registerUser(req.body);
            const token = createToken({ id: idUser });
            return res
                .cookie('x-access-token', token, { httpOnly: true, secure: true, maxAge: 259200000 })
                .json({ id: idUser });
        } catch (ex) {
            next({
                statusCode: ex.errno === 1062 ? 409 : 500,
                message: ex.message || ex
            });
        }
    }
}