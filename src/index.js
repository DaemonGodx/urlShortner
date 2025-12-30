import express from "express";
import cookieParser from "cookie-parser";
const app=express();
import connect from "./connection/connection.js";
import route from "./routes/index.js"
import staticRoute from "./routes/staticRoute.js"
import userRoute from "./routes/user.js"
import { MONGO_URL } from "./config/config.js";
const url=MONGO_URL;
import { checkAuth,restrictedTo  } from "./middlewares/auth.js";
connect(url);
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
app.set("view engine","ejs")
app.set("views","./src/view")
app.use(checkAuth)
app.use("/",staticRoute)
app.use("/user",userRoute)
app.use("/url",restrictedTo(["Normal"]),route);
app.listen(5000,()=>{console.log("Server is running on port 5000  ")})
