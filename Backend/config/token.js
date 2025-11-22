import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
const genToken=async(id)=>{
    try {
        const token=await jwt.sign({id},process.env.SECRET_KEY,{expiresIn:"2d"})
        return token
    } catch (error) {
        console.log((error));
        
    }
}
export default genToken;