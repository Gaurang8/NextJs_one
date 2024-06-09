import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";

export async function POST(request: Request) {
    await dbConnect();

    const session = await getServerSession(authOptions);

    const user: User = await session?.user;

    if (!session || !session.user) {
        return new Response("Unauthorized", { status: 401 });
    }

    const userId = user._id;

    const { acceptMessages } = await request.json()

    try {

        const updatedUser = await UserModel.findByIdAndUpdate({
            _id: userId
        }, {
            isAcceptingMessages: acceptMessages
        }, {
            new: true
        });

        if (!updatedUser) {
            return Response.json({
                success: false,
                message: "User not found"
            }, { status: 404 });
        }

        return Response.json({
            success: true,
            message: "Message accept status updated successfully",
            updatedUser: updatedUser
        }, { status: 200 });


    }
    catch (error) {
        return Response.json({
            success: false,
            message: "Error while updating user"
        }, { status: 500 });
    }


}


export async function GET(request: Request) {
    await dbConnect();

    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return new Response("Unauthorized", { status: 401 });
    }

    const user: User = await session?.user;

    const userId = user._id;

    try {
        const foundUser = await UserModel.findById
            ({ _id: userId });

        if (!foundUser) {
            return Response.json({
                success: false,
                message: "User not found"
            }, { status: 404 });
        }

        return Response.json({
            success: true,
            isAcceptingMessages: foundUser.isAcceptingMessage
        }, { status: 200 });

    }
    catch (error) {
        return Response.json({
            success: false,
            message: "Error while getting user acception status"
        }, { status: 500 });
    }

}