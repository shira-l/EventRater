import Joi from 'joi';

export const opinionSchema = Joi.object({
    rating: Joi.number().min(1).max(10).required(),
    description: Joi.string().min(3).max(500).required(),
    businessId: Joi.required(),
    userId: Joi.required()
});