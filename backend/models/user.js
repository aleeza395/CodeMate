import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username : String,
    email : String,
    password : String,
    confirmpassword : String
})

export default mongoose.model("user", userSchema)