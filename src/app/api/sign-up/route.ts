import dbConnect from "@/lib/dbConnect";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";

export async function POST(request:Request){
    await dbConnect();
    try {
        const {username,email,password}=await request.json();

        if(!username||!email||!password){
            return new Response(JSON.stringify({message:"All fields are required"}),{status:400})
        }

       const existingUserVerifiedByUsername = await UserModel.findOne({
            username,
            isVerified:true
        })

        if(existingUserVerifiedByUsername){
            return new Response(JSON.stringify({
                success:false,
                message:"User already exists"
            }),{status:400})
        }

        const existingUserByEmail = await UserModel.findOne({
            email,
        })

        const verifyCode = Math.floor(Math.random() * 9000) + 1000

        if(existingUserByEmail){
           if(existingUserByEmail.isVerified){
               return new Response(JSON.stringify({message:"User already exists"}),{status:400})
           }else{
            const hashedpassword = await bcrypt.hash(password,10)

            existingUserByEmail.password = hashedpassword;
            existingUserByEmail.verifyCode = verifyCode.toString();
            existingUserByEmail.verifyCodeExpiry = new Date(Date.now()+3600000)
            await existingUserByEmail.save()
           }
        }else{
            const hashedPassword = await bcrypt.hash(password,10)
            const expiryDate = new Date()
            expiryDate.setHours(expiryDate.getHours()+1)

           const newUser = new UserModel({
                username,
                email,
                password:hashedPassword,
                verifyCode,
                verifyCodeExpiry:expiryDate
            })

            await newUser.save()

        }

        const emailResponse = await sendVerificationEmail(email,username,verifyCode.toString())

        if(!emailResponse.success){
            return new Response(JSON.stringify({message:emailResponse.message}),{status:500})
        }

        return new Response(JSON.stringify({message:"User registered successfully"}),{status:200})
        
        
    } catch (error) {
        console.error("Error registering User",error)
        
        return new Response(JSON.stringify({message:"Error registering User"}),{status:500})

        
    }
}