import express from 'express'
const userRouter=express.Router()
import { isAuth } from '../midlewares/isAuth.js';
import { getCurrentUser } from '../controlles/user.controller.js';

//http://localhost:5000/api/current
userRouter.get('/current',isAuth,getCurrentUser)


export default userRouter;