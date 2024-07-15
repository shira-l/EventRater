import Joi from 'joi';
export const basicBusinessSchema = Joi.object({
    email: Joi.string().email().required(),
    userName: Joi.string().regex(/^[a-z\u0590-\u05fe]+$/i).min(2).max(20).required()
});
export const businessSchema = Joi.object({
    password: Joi.string().required(),
    phone:Joi.string().required().length(10),
    about:Joi.string().required(),
    location:Joi.number().required(),
    category:Joi.number().required()
});