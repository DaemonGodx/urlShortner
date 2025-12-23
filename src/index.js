import express from "express";
import cookieParser from "cookie-parser";
const app=express();
import connect from "./connection/connection.js";
import route from "./routes/index.js"
import staticRoute from "./routes/staticRoute.js"
import userRoute from "./routes/user.js"
const url="mongodb://127.0.0.1:27017/short-url"
import { LogedinUser, checkAuth  } from "./middlewares/auth.js";
connect(url);
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
app.set("view engine","ejs")
app.set("views","./src/view")
app.use("/",checkAuth,staticRoute)
app.use("/user",userRoute)
app.use("/url",LogedinUser,route);
app.listen(5000,()=>{console.log("Server is running on port 5000  ")})
