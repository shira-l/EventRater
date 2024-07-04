import Joi from 'joi';

export const priceSchema = Joi.object({
    businessId: Joi.number().required(),
    itemDescription: Joi.string().required(),
    itemPrice: Joi.number().integer().required()
});