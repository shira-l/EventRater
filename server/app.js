import express from 'express';
import { businessRouter } from './router/businessRouter.js'
import {logErrors} from './middleware/logError.js';
import cors from 'cors';
import {verifyToken} from './middleware/authenticateToken.js'
import {loginRouter} from './router/loginRouter.js';
import cookieParser from 'cookie-parser';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();


// Create a transporter object
const transporter = nodemailer.createTransport({
    service: 'gmail',
  secure: false, // use SSL
  auth: {
    user:'michalla37@gmail.com',
    pass: 'kqjf zowc lqej cqbi',
  }
});

// Configure the mailoptions object
const mailOptions = {
  from: 'michalla37@gmail.com',
  to: 'michalla37@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

// Send the email
// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log('Error:', error);
//   } else {
//     console.log('Email sent:', info.response);
//   }
// });

  
const app = express();

app.use(cors({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // מתודות המורשות
    allowedHeaders: ['Content-Type', 'Authorization'] ,// כותרות מותרות
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use('/authentication',loginRouter);
// app.use(allowCrossDomain);
app.use('/businesses', businessRouter);
app.use(verifyToken)
app.use(logErrors);


const PORT = process.env.PORT || 8083;


app.listen(PORT, (err) => {
    if (err) console.error(err);
    console.log("Server listening on PORT", PORT);
});
