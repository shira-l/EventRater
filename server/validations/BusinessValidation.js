import Joi from 'joi';
export const businessSchema = Joi.object({
    email: Joi.string().email().required(),
    businessName: Joi.string().regex(/^[a-z\u0590-\u05fe]+$/i).min(2).max(20).required()
});