import express from "express";
const staticRoute= express.Router();
import urlService from "../services/urlService.js"
const urlservice=new urlService()
staticRoute.get("/",async (req,res)=>{
    const url1=await  urlservice.getAll()
    res.render("home",{url:url1})
})
export default staticRoute
