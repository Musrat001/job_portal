import mongoose from "mongoose";

const JobModel = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    location: {
        city: {
            type: String,
            required: true
        },

        state: {
            type: String
        },

        country: {
            type: String,
            required: true
        }
    },

    experienceLevel: {
        type: String,
        required: true,
        enum: ["internship", "entry-level", "mid-level", "senior-level"]
    },

    salary: {
        type: String,
        required: true
    },

    recruiterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    workMode: {
        type: String,
        required: true,
        enum: ["on-site", "hybrid", "remote"]
    },

    deadline: {
        type: Date,
        required: true
    },

    isActive: {
        type: Boolean,
        default: true
    },
}, { timestamps: true });

export default mongoose.model("Job", JobModel);
