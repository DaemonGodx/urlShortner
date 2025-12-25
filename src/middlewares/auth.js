import { userService } from "../services/userServiceinstance.js"


// export const LogedinUser=(req,res,next)=>{
//     const sessionId=req.cookies?.uid
//       if (!sessionId) return res.redirect("/login");
//   const user = userService.getUser(sessionId);

//   if (!user) return res.redirect("/login");

//     req.user=user
//     next()
// }
// export const checkAuth=(req, res, next)=> {
//   const userUid = req.cookies?.uid;

//   const user = userService.getUser(userUid);
// req.user = user;
//   next();

// }
export  const checkAuth = (req, res, next) => {
  const userid=req.cookies?.uid
  req.user=null
  if(!userid) return next()
  const user=userService.getUser(userid)
  req.user=user
  next()
}
export function restrictedTo(roles = []) {
  return function (req, res, next) {
    if (!req.user) {
      return res.render("welcome")
      
    }

    if (!roles.includes(req.user.user.role)) {
      return res.status(403).send("Unauthorized");
    }

    next();
  };
}

   

  
//For json response based
// export const LogedinUser=(req,res,next)=>{
//     const authHeader = req.headers.authorization;

//     if (!authHeader) {
//         return res.redirect("/login");
//     }

//     const token = authHeader.split(" ")[1]; 

//     if (!token) {
//         return res.redirect("/login");
//     }

//     const user = userService.getUser(token);

//     if (!user) {
//         return res.redirect("/login");
//     }

//     req.user = user;
//     next();
// }
//  export const checkAuth = (req, res, next) => {
//     const authHeader = req.headers.authorization;

//     if (!authHeader) {
//         req.user = null;
//         return next();
//     }

//     const token = authHeader.split(" ")[1];

//     if (!token) {
//         req.user = null;
//         return next();
//     }

//     const user = userService.getUser(token);
//     req.user = user || null;

//     next();
// };
