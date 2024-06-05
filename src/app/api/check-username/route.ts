import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { z } from "zod";

import { usernameValidation } from "@/schemas/signUpSchema";

const UsernameQuerySchema = z.object({
    username: usernameValidation,
})

export async function GET(request: Request) {
    await dbConnect()

    try {

        const { searchParams } =  new URL(request.url)

        const queryParams = {
            username: searchParams.get("username")
        }

        const result = UsernameQuerySchema.safeParse(queryParams)
         
        if (!result.success) {
           const usernameError = result.error.format().username?._errors;
        
           return Response.json({
            success : false,
            message : usernameError ? usernameError : "Invalid query parameter "
           },{
            status : 400
           })
        }

        console.log("result" , result);

        const {username} = result.data;

        let ExistingUser = await UserModel.findOne({
            username , isVerified : true
        })

        if (ExistingUser) {

            return Response.json({
                success : false,
                message : "Username is already taken"
            })

        }
        else {
            return Response.json({
                success : true,
                message : "Username is uniqe"
            })

        }



    }
    catch (error) {
        console.error(error)
        return Response.json({
            success: false,
            message: "An error occurred"
        }, {
            status: 500
        })


    }
}


export async function POST(request: Request) {
    await dbConnect()

    const body = z.object({
        username: z.string(),
    }).parse(await request.json())

    const user = await UserModel.findOne({
        username: body.username,
    })

}