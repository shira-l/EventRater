import express from 'express';
import { PriceController } from '../controllers/priceController.js';

const router = express.Router();

router.get('/', PriceController.getPricesByBusiness);
router.post('/', PriceController.addPrice);
router.delete('/:id', PriceController.deletePrice);

export default router;