import { verify } from "crypto";
import mongoose, { Schema } from "mongoose";

// we dont use pre-hooks

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: [true, "Enter a unique username"]
    },
    email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: [true, "Enter a unique email"]
    },
    password: {
        type: String,
        required: [true, "Please provide a email"],
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date
    
})

const User = mongoose.models.users || mongoose.model("users", userSchema)

export default User