import express from 'express';
import { businessRouter } from './router/businessRouter.js'
import {logErrors} from './middleware/logError.js';
import cors from 'cors';
import {loginRouter} from './router/authRouter.js';
import {opinionRouter} from './router/opinionRouter.js';
import cookieParser from 'cookie-parser';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import otpGenerator from 'otp-generator';
dotenv.config();


// Create a transporter object
const transporter = nodemailer.createTransport({
    service: 'gmail',
  secure: false, // use SSL
  auth: {
    // user:'slazarov@g.jct.ac.il',
    // pass:'jrqHXtmu'
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
// index.js

import{ Auth, LoginCredentials } from "two-step-auth";

// async function login(emailId) {
//   try {
//     const res = await Auth(emailId, "Company Name");
//     console.log(res);
//     console.log(res.mail);
//     console.log(res.OTP);
//     console.log(res.success);
//   } catch (error) {
//     console.log("error",error);
//   }
// }

// // This should have less secure apps enabled
// LoginCredentials.mailID = "slazarov@g.jct.ac.il"; 

// // You can store them in your env variables and
// // access them, it will work fine
// LoginCredentials.password = "jrqHXtmu"; 
// LoginCredentials.use = true;

// // Pass in the mail ID you need to verify
// login("michalla37@gmail.com"); 

  
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
app.use('/opinions', opinionRouter);
app.use(logErrors);


const PORT = process.env.PORT || 8083;


app.listen(PORT, (err) => {
    if (err) console.error(err);
    console.log("Server listening on PORT", PORT);
});
