import mongoose from "mongoose";

const ProfileModel = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    dateOBirth: {
        type: String

    },

    contactNumber: {
        type: String

    },

    skills: {
        type: [String],
        default: []

    },

    education: [
        {
            degree: String,
            institution: String,
            fieldOfStudy: String,
            startYear: Number,
            endYear: Number
        }
    ],

    experience: [
        {
            company: {
                type: String,
                required: true
            },

            position: {
                type: String,
                required: true
            },

            startDate: {
                type: String,
                required: true
            },

            endDate: {
                type: Date
            },

            description: {
                type: String
            }
        }
    ],

    avatar: {
        type: String

    },

    resume: {
        type: String

    }

}, { timestamps: true });

const Profile = mongoose.model("Profile", ProfileModel);

export default Profile;