import express from 'express';
import { businessRouter } from './router/businessRouter.js'
import { todoRouter } from './router/todoRouter.js';
import { postRouter } from './router/postRouter.js';
import {logErrors} from './middleware/logError.js';
import {loginRouter} from './router/loginRouter.js';

// let allowCrossDomain = function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', "*");
//     res.header('Access-Control-Allow-Headers', "*");
//     res.header('Access-Control-Allow-Methods', "*");
//     next();
//   }
  
const app = express();

app.use(express.json());
app.use('/login',loginRouter);
// app.use(allowCrossDomain);
app.use('/businesses', businessRouter);
app.use('/posts', postRouter);
app.use('/todos', todoRouter);
app.use(logErrors);


const PORT = process.env.PORT;

app.listen(PORT, (err) => {
    if (err) console.error(err);
    console.log("Server listening on PORT", PORT);
});
