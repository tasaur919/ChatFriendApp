import mongoose from "mongoose"

const userSchema=new mongoose.Schema({
    name:{
     type:String,
     required:true,
    },
   username:{
    type:String,
    required:true,
    unique:true
   },
   email:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
   },
   password:{
    type:String,
    required:true
   },
   image:{
    type:String
   }
//    image:{
//     type:String,
//     default:"string"
//    },
//    mobile:{type:Number}
},
{timestamps:true})

const User=mongoose.model('User',userSchema)
export default User;