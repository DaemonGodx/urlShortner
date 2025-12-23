import User from "../models/user.js";
import bcrypt from "bcrypt";
class userRepo
{
    async register(name,email,password){
        try{
            const createUser=await User.create({
                name,
                email,
                password:await bcrypt.hash(password,10)
            })
            return createUser;
        }catch(err){
            console.log("Repository layer error",err)
        }


}
async login(email){
    try{
        const user=await User.findOne({email})
        if(!user)
        {
            return false
        }
        return user;
    }catch(err){
        console.log("Repository layer error",err)
    }
}
}
export default userRepo;