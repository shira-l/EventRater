import Joi from 'joi';

export const userSchema = Joi.object({
    email: Joi.string().email().required(),
    userName: Joi.string().regex(/^[a-z\u0590-\u05fe]+$/i).min(2).max(20).required(),
    password: Joi.string().required().min(8).max(20)
});