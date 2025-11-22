import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const isAuth=async(req,res,next)=>{
    try {
        const token=req.cookies.token
        console.log(token);
        if(!token){
            return res.status(400).json({message:"Please Login first!"})
        }
        const verifyToken=await jwt.verify(token,process.env.SECRET_KEY)
        console.log(verifyToken);
        req.userId=verifyToken.id
        next();
        

        
    } catch (error) {
        res.status(500).json({message:"Internal server error!"})
    }

}