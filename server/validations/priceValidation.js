import Joi from 'joi';

export const priceSchema = Joi.object({
    itemDescription: Joi.string().regex(/^[a-zA-Z\s]*$/i).required().min(2).max(30),
    itemPrice: Joi.number().integer().required(),
    businessId:Joi.number()
});