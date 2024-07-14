import Joi from 'joi';

export const priceSchema = Joi.object({
    itemDescription: Joi.string().required(),
    itemPrice: Joi.number().integer().required()
});