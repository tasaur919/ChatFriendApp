import express from 'express'
const authRouter=express.Router()
import { login, logOut, signUp } from '../controlles/Auth.controller.js';


authRouter.post('/signup',signUp)//http://localhost:5000/api/signup
authRouter.post('/login',login)
authRouter.get('/logout',logOut)

export default authRouter;