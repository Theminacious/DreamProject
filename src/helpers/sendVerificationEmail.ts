
import { resend } from "@/lib/resend";
import VerificationEmail from '../../emails/VerificationEmail'
import {ApiResponse} from '@/types/ApiResponse'

export async function sendVerificationEmail(
    email:string,
    username:string,
    verifyCode:string,
):Promise<ApiResponse>{
    try {

        await resend.emails.send({
            from:'onboarding@resend.dev',
            to:email,
            subject:'DROP-N-GO || Verification OTP Email',
            react:VerificationEmail({username,otp:verifyCode})
        })



        return {success:true,message:"Verification email sent successfully"}

        
    } catch (emailerror) {
        console.error("Error sending verification email",emailerror)

        return {
            success:false,
            message:"Error sending verification email"
        }

        
    }

}
