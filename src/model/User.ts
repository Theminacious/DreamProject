import mongoose, { Schema,Document } from 'mongoose'
export interface User extends Document{
    username:string;
    email:string;
    password:string;
    verifyCode:string;
    verifyCodeExpiry: Date;
    isVerified:boolean,
}

const userSchema:Schema<User> = new Schema({

    username:{
        type:String,
        required:[true,"Username is required"],
        trim:true,
        unique:true,
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true,
        match:[/^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/,"Please use a valid email address"]
    },
    password:{
        type:String,
        required:[true,"Password is required"]
    },
    verifyCodeExpiry:{
        type:Date,
        required:[true,"Verify code expiry is required"]
    },
     
    isVerified:{
        type:Boolean,
        default:false

    }


})

const UserModel =(mongoose.models.User as mongoose.Model<User>) ||  mongoose.model<User>("User",userSchema)

export  default UserModel
