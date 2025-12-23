import { userService } from "../services/userServiceinstance.js"

export const LogedinUser=(req,res,next)=>{
    const sessionId=req.cookies?.uid
      if (!sessionId) return res.redirect("/login");
  const user = userService.getUser(sessionId);

  if (!user) return res.redirect("/login");

    req.user=user
    next()
}
export const checkAuth=(req, res, next)=> {
  const userUid = req.cookies?.uid;

  const user = userService.getUser(userUid);
req.user = user;
  next();

}
