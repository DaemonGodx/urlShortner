import express from "express";
const staticRoute= express.Router();
import Url from "../models/url.js"
staticRoute.get("/",async (req,res)=>{
    const url1=await Url.find({})
    res.render("home",{url:url1})
})
export default staticRoute
