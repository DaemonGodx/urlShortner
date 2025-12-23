import express from "express";

const app=express();
import connect from "./connection/connection.js";
import route from "./routes/index.js"
import staticRoute from "./routes/staticRoute.js"
const url="mongodb://127.0.0.1:27017/short-url"
connect(url);
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.set("view engine","ejs")
app.set("views","./src/view")
app.use("/",staticRoute)


app.use("/url",route);
app.listen(5000,()=>{console.log("Server is running on port 5000  ")})
