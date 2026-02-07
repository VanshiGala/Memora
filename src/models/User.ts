import mongoose,{Schema, model,models} from "mongoose"

const UserSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    fullName:{
        type:String
    },
    profilePic: { type: String }
},{timestamps:true})

const User = models.User || model("User", UserSchema);

export default User