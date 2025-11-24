import express from 'express'
const userRouter=express.Router()
import { isAuth } from '../midlewares/isAuth.js';
import { editProfile, getCurrentUser, getOtherUsers } from '../controlles/user.controller.js';
import { upload } from '../midlewares/multer.js';

//http://localhost:5000/api/current
userRouter.get('/current',isAuth,getCurrentUser)
userRouter.get('/others',isAuth,getOtherUsers)
userRouter.put('/profile',isAuth,upload.single("image"),editProfile)



export default userRouter;