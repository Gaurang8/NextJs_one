import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";
import mongoose from "mongoose";


export async function GET(request: Request) {
    await dbConnect();

    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return new Response("Unauthorized", { status: 401 });
    }

    const user: User = await session?.user;

    const userId = new mongoose.Types.ObjectId(user._id);

    try {
        const foundUser = await UserModel.aggregate([
            {$match: {_id: userId}},
            {$unwind: "$messages"},
            {$sort: {"messages.createdAt": -1}},
            {$group: {
                _id: "$_id",
                messages: {$push: "$messages"}
            }}
        ])

        if (!foundUser || foundUser.length === 0) {
            return Response.json({
                success: false,
                message: "User not found"
            }, { status: 404 });
        }

        return Response.json({
            success: true,
            messages: foundUser[0].messages
        }, { status: 200 });

    }
    catch (error) {
        return Response.json({
            success: false,
            message: "Error while getting user messages"
        }, { status: 500 });
    }

}