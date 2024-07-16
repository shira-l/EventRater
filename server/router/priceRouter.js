import express from 'express';
import { PriceController } from '../controllers/priceController.js';
import { verifyToken } from '../middleware/authenticateToken.js';
const priceRouter = express.Router();
const priceController = new PriceController();

priceRouter.get('/', priceController.getPricesByBusiness);
priceRouter.post('/',verifyToken, priceController.addPrice);
priceRouter.delete('/:idPrice',verifyToken, priceController.deletePrice);
priceRouter.put('/',verifyToken, priceController.updatePrice);
export { priceRouter }