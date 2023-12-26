import express from 'express'
import mongoose from "mongoose";

let app = express();
mongoose.connect("mongodb+srv://root:1234@mern-estate.xic95pt.mongodb.net/mern-estateretryWrites=true&w=majority").then(()=>{
    console.log("Connected");
}).catch((err) =>{
    console.log(err)
})
app.listen(3000, () =>{
    console.log("runing hellowsadsadasw");
})
