import { userService } from "../services/userServiceinstance.js"
export const register=async(req,res)=>{
    try{
        const createUser=await userService.register(req.body.name,req.body.email,req.body.password)
        return res.status(200).redirect("/login")
    }catch(err){
        return res.status(500).json({
            data:{},
            success:false,
            message:"error",
            error:err.message
        })
    }
}
export const login=async(req,res)=>{
    try{
        const {sessionId,user}=await userService.login(req.body.email,req.body.password);
        if (!user){
    return res.render("login", {
      error: "Invalid Username or Password",
    });}
     res.cookie("uid", sessionId);
    // res.json({sessionId}) 
    return res.redirect("/");
    
}catch(err){
    return res.render("login", {
      error: err.message,
    });
}
}