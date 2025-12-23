import express from "express";
const userRoute=express.Router();
import {register,login} from "../controllers/userController.js"

userRoute.post("/",register)
userRoute.post("/login",login)
export default userRoute