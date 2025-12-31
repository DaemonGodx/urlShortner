import express from "express";
const staticRoute= express.Router();
import urlService from "../services/urlService.js"
const urlservice=new urlService()
import { restrictedTo } from "../middlewares/auth.js";
staticRoute.get("/", async (req, res) => {
  if (!req.user) {
    return res.render("Welcome");
  }

  const urls = await urlservice.getAll(req.user._id);

  return res.render("home", {
    url: urls,
    user: req.user
  });
});
staticRoute.get("/signup",(req,res)=>{
    res.render("signup")
})
staticRoute.get("/login",(req,res)=>{
    res.render("login")
})
staticRoute.post("/logout", (req, res) => {
  res.clearCookie("uid");
  res.redirect("/");
});
export default staticRoute
