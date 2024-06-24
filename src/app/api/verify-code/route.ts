import dbConnect from '@/lib/dbConnect'
import UserModel from '@/model/User'
import {z} from 'zod'
const verifyCodeSchema = z.object({
    code:z.string().length(6,"Verifiaction code must be 6 digits")
})


export async function POST(request: Request) {
    await dbConnect();
    try {
        const {username,code}=await request.json()
        const decodedUsername = decodeURIComponent(username)
        const user = await UserModel.findOne({
            username:decodedUsername,
        })

        if(!user){
            return Response.json({
                sucess:false,
                message:"User not found"
            },
            {status:404}) 
        }
        const isCodeValid = user.verifyCode === code
        const isCodeNotExpired = new Date(user.verifyCodeExpiry)>new Date()

       
        if(user.isVerified){
            return Response.json({
                sucess:false,
                message:"User already verified"
            },
            {status:400}) 
        }



        if(isCodeValid && isCodeNotExpired
        ){
            user.isVerified = true
            await user.save()
    
            return Response.json({
                sucess:true,
                message:"User verified successfully"
            },
            {status:200})
        }
        else if(!isCodeValid){
            return Response.json({
                sucess:false,
                message:"Invalid verification code"
            },
            {status:400}) 
        }else if(!isCodeNotExpired){
            return Response.json({
                sucess:false,
                message:"Verification code expired ! SignUp Again"
            },
            {status:400})

        }

      

        
    } catch (error) {
        console.error("Error Verifying User",error)
        return Response.json({
            sucess:false,
            message:"Error Verifying User"
        },
        {status:500}) 

    }
    }