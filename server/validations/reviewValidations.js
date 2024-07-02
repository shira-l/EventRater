import Joi from 'joi';

export const reviewSchema = Joi.object({
    rating: Joi.number().min(1).max(5).required(),
    description: Joi.string().min(3).max(1500).required(),
    userId: Joi.required(),
    businessId: Joi.required()
});