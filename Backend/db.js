import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose';

const DataBase=async()=>{
   try {
    await mongoose.connect(`${process.env.DB_URL}/${process.env.DB_Name}`).then(()=>{
            console.log("db connected");
               
       }).catch(()=>{console.log('db not connect!')}
       )
   } catch (error) {
      console.log('db not connected!');
      
   }
}

export default DataBase;