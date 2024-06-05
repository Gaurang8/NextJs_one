import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";

import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request: Request) {
    await dbConnect()

    try {

        const { email, username, password } = await request.json()

        console.log(email, username, password)


        const verifiedUserByUsername = await UserModel.findOne({
            username,
            isVerified: true
        })

        if (verifiedUserByUsername) {
            return Response.json({
                success: false,
                message: "Username already exists"
            }, {
                status: 400
            })
        }


        const verifiedUserByEmail = await UserModel.findOne({
            email
        })

        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
        console.log(verifyCode)

        if (verifiedUserByEmail) {
            if (verifiedUserByEmail.isVerified) {
                return Response.json({
                    success: false,
                    message: "Email already exists"
                }, {
                    status: 400
                })
            } else {
                const hashedPassword = await bcrypt.hash(password, 10)
                verifiedUserByEmail.password = hashedPassword
                verifiedUserByEmail.verifyCode = verifyCode
                verifiedUserByEmail.verifyCodeExpiry = new Date()
                verifiedUserByEmail.verifyCodeExpiry.setHours(verifiedUserByEmail.verifyCodeExpiry.getHours() + 1)
                await verifiedUserByEmail.save()
            }
        } else {
            const hashedPassword = await bcrypt.hash(password, 10)

            const expiryDate = new Date()
            expiryDate.setHours(expiryDate.getHours() + 1)

           const newUser = await new UserModel({
                username,
                email ,
                password : hashedPassword , 
                verifyCode : verifyCode,
                verifyCodeExpiry : expiryDate,
                isAcceptingMessage: true,
                isVerified: false,
                message : []
            })

            await newUser.save()
            
        }
        const emailResponse = await sendVerificationEmail(email , username , verifyCode);

        console.log(emailResponse)

        if (!emailResponse.success) {
            return Response.json({
                success: false,
                message: emailResponse.message
            }, {
                status: 500
            })
        
        }

        return Response.json({
            success: true,
            message: "User Registered Successfully , Please verify your email address"
        })

    } catch (err) {
        console.error("error registering user", err)

        return Response.json({
            success: false,
            message: "Error Registering User"
        }, {
            status: 500
        })
    }
}