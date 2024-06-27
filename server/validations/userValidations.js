import Joi from 'joi';

export const userSchema = Joi.object({
    email: Joi.string().email().required(),
    userName: Joi.string().alphanum().min(2).max(20).required(),
    password: Joi.string().required()
});