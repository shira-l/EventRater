
import express from "express";
import { LoginController } from '../controllers/authController.js'

const authRouter = express.Router();

const loginController = new LoginController()
authRouter.post("/login" ,loginController.login)
authRouter.post("/register", loginController.register)
export {
    authRouter
}