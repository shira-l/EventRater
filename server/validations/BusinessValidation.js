import Joi from 'joi';
export const basicBusinessSchema = Joi.object({
    email: Joi.string().email().required(),
    userName: Joi.string().regex(/^[a-z\u0590-\u05fe]+$/i).min(2).max(20).required()
});
export const businessSchema = Joi.object({
    email: Joi.string().email().required(),
    userName: Joi.string().regex(/^[a-z\u0590-\u05fe]+$/i).min(2).max(20).required(),
    password: Joi.string().required().min(8).max(20),
    phone:Joi.string().required().length(10),
    location:Joi.required(),
    category:Joi.required()
});