import mongoose from "mongoose";

function connect(url) {
    mongoose.connect(url)
.then(()=>console.log("connected"))
.catch((err)=>console.log(err));
}
export default connect;