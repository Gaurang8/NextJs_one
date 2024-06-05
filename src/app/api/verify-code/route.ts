import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { z } from "zod";

import { verifySchema } from "@/schemas/verifySchema";

const VerifyQuerySchema = z.object({
    code: verifySchema
})


export async function POST(request: Request) {
    await dbConnect()

    try {

        const { username, code } = await request.json()

        // const codeResult = VerifyQuerySchema.safeParse(
        //     {
        //         code
        //     }
        // )

        // if (!codeResult.success) {


        //     const ErrMessage = codeResult.error.format().code?._errors;


        //     return Response.json({
        //         success: false,
        //         message: ErrMessage ? ErrMessage : "Invalid code"
        //     }, {
        //         status: 400
        //     })


        // }

        const decodedUsername = decodeURIComponent(username)

        const user = await UserModel.findOne({
            username: decodedUsername
        })

        if (!user) {
            return Response.json({
                success: false,
                message: "User not found"
            }, {
                status: 400
            })

        }

        const isCodeValid = user.verifyCode === code;
        const isCodeExpired = new Date(user.verifyCodeExpiry) < new Date()

        if (isCodeValid && !isCodeExpired) {
            user.isVerified = true;
            await user.save()

            return Response.json({
                success: true,
                message: "User verified Successfully"
            }, {
                status: 200
            })

        }
        else if (isCodeExpired) {
            return Response.json({
                success: false,
                message: "Verification Code expired"
            }, {
                status: 400
            })

        }
        else {
            return Response.json({
                success: false,
                message: "Incorrect Verification code"
            }, {
                status: 400
            })
        }




    }
    catch (error) {
        console.log(error)

        return Response.json({
            success: false,
            message: "Error Verifying user"
        }, {
            status: 500
        })

    }
}