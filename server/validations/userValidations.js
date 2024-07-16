import Joi from 'joi';

export const userSchema = Joi.object({
    email: Joi.string().email().required(),
    userName: Joi.string().regex(/^[a-zA-Z\s]*$/i).min(2).max(20).required(),
    password: Joi.string().required()
});