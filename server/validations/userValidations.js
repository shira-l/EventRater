import Joi from 'joi';

export const userSchema = Joi.object({
    email: Joi.string().email().required(),
    username: Joi.string().alphanum().min(2).max(20).required(),
    password: Joi.string().min(8).max(20).required()
});