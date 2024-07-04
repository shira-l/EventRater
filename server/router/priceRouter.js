import express from 'express';
import { PriceController } from '../controllers/priceController.js';

const priceRouter = express.Router();
const priceController = new PriceController();

priceRouter.get('/', priceController.getPricesByBusiness);
priceRouter.post('/', priceController.addPrice);
priceRouter.delete('/:id', priceController.deletePrice);

export { priceRouter }