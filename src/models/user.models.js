import mongoose, { Mongoose, Types } from "mongoose";

const UserModel = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    username: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },

    password: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    userType: {
        type: String,
        required: true,
        enum: ["candidate", "recruiter", "admin"],
        default: "candidate"
    }

}, { timestamps: true })

const User = mongoose.model("User", UserModel);

export default User; 