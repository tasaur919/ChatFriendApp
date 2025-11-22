import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
dotenv.config()
import DataBase from './db.js'
import authRouter from './routes/auth.routes.js'
import bodyParser from 'body-parser'
import userRouter from './routes/user.routes.js'

const app=express()
app.use(cookieParser())
const port=process.env.PORT || 5000

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
// app.use(express.json())
app.use(bodyParser.json())
app.use('/api',authRouter)
app.use('/api',userRouter)


DataBase()



app.listen(port,()=>{
    console.log("server is running ...");
    
})