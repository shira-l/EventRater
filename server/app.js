import express from 'express';
import { businessRouter } from './router/businessRouter.js'
import {logErrors} from './middleware/logError.js';
import cors from 'cors';
import {authRouter} from './router/authRouter.js'
import {reviewRouter} from './router/reviewRouter.js';
import { enumRouter } from './router/enumRouter.js';
import { priceRouter } from './router/priceRouter.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(cors({
    origin: true,
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use('/enums',enumRouter)
app.use('/authentication',authRouter);
app.use('/businesses', businessRouter);
app.use('/reviews', reviewRouter);
app.use('/price', priceRouter);
app.use(logErrors);


const PORT = process.env.PORT || 8083;


app.listen(PORT, (err) => {
    if (err) console.error(err);
    console.log("Server listening on PORT", PORT);
});
