import mongoose , { Schema , Document} from "mongoose";

export interface Message extends Document {
    content: string;
    createdAt: Date;
}

const MessageSchema : Schema<Message> = new Schema({
    content: {
        type: String,
        required: true
    } , 
    createdAt : {
        type: Date,
        required: true,
        default: Date.now
    }
})

export interface User extends Document {
    username : String,
    email : String,
    password : String , 
    verifyCode : String,
    verifyCodeExpiry : Date ,
    isAcceptingMessage: boolean,
    isVerified: boolean,
    message : Message[]
}

const UserSchema : Schema<User> = new Schema({
    username : {
        type: String,
        required: [true , "Username is required"],
        unique: true
    },
    email : {
        type: String,
        required: [true , "Email is required"],
        unique: true,
        match: [/.+\@.+\..+/ , "Please fill a valid email address"]
    },
    password : {
        type: String,
        required: [true , "Password is required"]
    },
    verifyCode : {
        type: String,
        required: [true , "Verify code is required"]
    },
    verifyCodeExpiry : {
        type: Date,
        required: [true , "Verify code expiry is required"] ,
    },
    isAcceptingMessage: {
        type: Boolean,
        default: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    message : [MessageSchema]
})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User" , UserSchema);

export default UserModel;