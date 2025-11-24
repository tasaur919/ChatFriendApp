import uploadOnCloudinary from "../config/cloudinary.js";
import User from "../models/user.model.js";

export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId;
    const user =await User.findById(userId).select("-password");
    if(!user){
        return res.status(400).json({message:"user not found!"})
    }
    console.log(user);
    
    return res.status(200).json(user)
  } catch (error) {
    return res.status(500).json({message:"internal server error !"})
  }
};


export const editProfile=async(req,res)=>{
  try {
    let {name}=req.body
    let image;
    if(req.file){
       image=await uploadOnCloudinary(req.file.path)
    }
    let user=await User.findByIdAndUpdate(req.userId,{
      name:name,
      image:image
    },
  {new:true}).select("-password")
    if(!user){

      return res.status(400).json({message:"User not found"})
    }
    return res.status(200).json(user)
  } catch (error) {
    return res.status(500).json({message:"Profile error !"})
  }
}

export const getOtherUsers=async(req,res)=>{
  try {
    
    const users=await User.find({
      _id:{$ne:req.userId}
    }).select("-password")
    if(!users){
      return res.status(400).json({message:"users not available!"})
    }
    return res.status(200).json(users)
  } catch (error) {
    return res.status(500).json({message:"Other users not found!"})
  }
}