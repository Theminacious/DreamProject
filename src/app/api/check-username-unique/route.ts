import dbConnect from '@/lib/dbConnect'
import UserModel from '@/model/User'
import { usernameValidation } from '@/schemas/signUpSchema'
import {z} from'zod'
 

const UsernameQuerySchema = z.object({
    username:usernameValidation
})


export async function GET(request:Request) {
    await dbConnect()
    try {
        const {searchParams} = new URL(request.url)
        const queryparam={
         username : searchParams.get('username')
        }

        // validate with zod
        const result = UsernameQuerySchema.safeParse(queryparam)

        if(!result.success){
           const usernameErrors = result.error.format().username?._errors || []

           return Response.json(
            {
                sucess:false,
                message:usernameErrors?.length>0?usernameErrors.join(','):"Invalid query parameters",
            },
            {status:400}
        )
        }

        const {username} = result.data
        const existingVerifiedUser  = await UserModel.findOne({username,isVerified:true})

        if(existingVerifiedUser){
            return Response.json(
                {
                    sucess:false,
                    message:"User already exists"
                },
                {status:400}
            )
        }

        return Response.json(
            {
                sucess:true,
                message:"Username is Unique"
            },
            {status:200}
        )

        
    } catch (error) {
        console.error("Error checking Username",error)
        return Response.json(
            {
                sucess:false,
                message:"Error checking username"
            },
            {status:500}
        )


    }
        
    }