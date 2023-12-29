import express from 'express'
import mongoose from "mongoose";
import userRouter from "./routee/usersad.js"
import authRouter from "./routee/authRoutes.js"

let app = express();

app.use(express.json());
mongoose.connect("mongodb+srv://root:1234@mern-estate.xic95pt.mongodb.net/mern-estateretryWrites=true&w=majority").then(()=>{
    console.log("Connected");
}).catch((err) =>{
    console.log(err)
})
app.listen(3000, () =>{
    console.log("runing hellowsadsadasw");
})

app.get('/test', (req,res)=>{
   res.send('hellow word');
});
app.use('/server/user',userRouter);
app.use('/server/auth',authRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});