import { UserService } from '../service/userService.js'
import { userSchema } from '../validations/userValidations.js';
export class LoginController {
    static userService=new UserService();
    async login(req, res, next) {
        try {
            const {token, user} = await LoginController.userService.loginUser(req.body);
            return res.cookie('x-access-token', token, { httpOnly: true }).json({ token: token, user: user });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex.message;
            next(err)
        }
    }
    async register(req, res, next) {
        try {
            const { error } = userSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }
            const { token, user } = await LoginController.userService.registerUser(req.body);
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