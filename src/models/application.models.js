import mongoose from "mongoose";

const ApplicationModel = new mongoose.Schema({
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required: true
    },

    applicantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    status: {
        type: String,
        enum: [
            "applied",
            "shortlisted",
            "interview",
            "rejected",
            "selected"
        ],
        default: "applied"
    }

}, { timestamps: true })

module.exports = mongoose.model("Appliaction", ApplicationModel);