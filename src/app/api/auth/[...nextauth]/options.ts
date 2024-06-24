import { NextAuthOptions } from "next-auth";
import CredentialProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import GoogleProvider from "next-auth/providers/google";


export const authOptions: NextAuthOptions = {
    providers: [
        CredentialProvider({
            id:'credentials',
            name:"Credentials",
            credentials:{
                email:{label:'Email',type:'text',placeholder:'Email'},
                password:{label:'Password',type:'password',placeholder:'Password'}
            },
            async authorize(credentials:any):Promise<any>{
                await dbConnect()
                try {
                    const user = await UserModel.findOne(
                        {
                            $or:[
                                {email:credentials?.identifier},
                                {username:credentials?.identifier}
                            ]
                        }
                    )

                    if(!user){
                        throw new Error("No user found with this email")
                    }
                    if(!user.isVerified){
                        throw new Error("Please verify your account before login")
                    }

                    const isPasswordCorrect = await bcrypt.compare(credentials.password,user.password)

                    if(!isPasswordCorrect){
                        throw new Error("Incorrect password")
                    }

                    return user

                    
                } catch (error:any) {
                    throw new Error(error) 
                }

            }

        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
            authorization: {
              params: {
                prompt: "consent",
                access_type: "offline",
                response_type: "code"
              }
            }
          })
    ],
    callbacks:{
        async jwt({token,user}){
            if(user){
                token._id = user._id?.toString()
                token.isVerified = user.isVerified;
                token.username = user.username
            }
            return token
        },
        async session({session,token}){
            if(token){
                session.user._id = token._id
                session.user.isVerified = token.isVerified
                session.user.username = token.username
            }
            return session
        }
    },
    pages:{
        signIn:"/sign-in"
    },
    session:{
        strategy:'jwt'
    },
    secret:process.env.NEXTAUTH_SECRET
   
}
