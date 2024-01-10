import express from 'express'
import mongoose from "mongoose";
import userRouter from "./routee/usersad.js"
import authRouter from "./routee/authRoutes.js"
import listingRouter from "./routee/listingRouter.js"
import cors from 'cors';
let app = express();
import cookieParser from 'cookie-parser';

app.use(express.json());
app.use(cors());
// app.use(cookieParser);
mongoose.connect("mongodb+srv://root:1234@mern-estate.xic95pt.mongodb.net/mern-estateretryWrites=true&w=majority").then(()=>{
    console.log("Connected");
}).catch((err) =>{
    console.log(err)
})
app.listen(4000, () =>{
    console.log("runing hellowsadsadasw");
})

app.get('/test', (req,res)=>{
   res.send('hellow word');
});
app.use('/server/user',userRouter);
app.use('/server/auth',authRouter);
app.use('/server/listing', listingRouter);
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});