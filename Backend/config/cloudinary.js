import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'
import dotenv from "dotenv";
dotenv.config();


const uploadOnCloudinary=async(filePath)=>{
    cloudinary.config({
        cloud_name:`${process.env.CLOUD_NAME}`,
        api_key:`${process.env.API_KEY}`,
        api_secret:`${process.env.API_SECRET}`
        
       });
       
    try {
        //upload image
        const uploadResult=await cloudinary.uploader.upload(filePath)
        console.log(uploadResult);
        
        fs.unlinkSync(filePath) //delete file
        return uploadResult.secure_url;
    } catch (error) {
        fs.unlinkSync(filePath) //delete file
        console.log(error);
        
        
    }

}
export default uploadOnCloudinary