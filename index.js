import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/userRouter.js";
import productRouter from "./routes/productRouter.js";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config();

let app = express()
app.use(bodyParser.json());

app.use((req,res,next)=>{
    let token = req.header("Authorization")

    if(token!=null){
        token = token.replace("Bearer ","")
        jwt.verify(token,"kv-secret-89!",(err,decorded)=>{
            if(!err){
                req.user = decorded;
            }
        })
    }
    next();
    
})

const mongoUrl = process.env.MONGO_URL;

mongoose.connect(mongoUrl);
const connection = mongoose.connection;

connection.once("open",()=>{
    console.log("mongoDB connection establied successfully");
})

app.use("/api/users",userRouter);
app.use("/api/products",productRouter);

app.listen(3000,()=>{
    console.log("sever is running on port 3000")
})

// {
//     "email": "mahesha@gmail.com",
//     "password": "securePasswold123",
//     "role": "customer",
//     "fristName": "gihan",
//     "lastName": "main",
//     "address": "123 Main St, Springfield, IL 62701",
//     "phone": "0710536468",
// }

//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmlzdE5hbWUiOiJnaWhhbiIsImxhc3ROYW1lIjoibWFpbiIsImVtYWlsIjoibWFoZXNoYUBnbWFpbC5jb20iLCJyb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE3Mzc4NzU3NTd9.IBYbpwvIrJBCic3g6HKzDJvqJ0DWbXWpyKtPWr75eSQ"