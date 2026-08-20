import Profile from "../models/profile.models.js";

const verifyProfileReqBody = async (req, res, next) => {
    // console.log(req.body);

    const { dateOfBirth, contactNumber, skills, education, experience } = req.body;

    if (!dateOfBirth) {
        return res.status(402).json({
            message: "Date of birth is required"
        })

    }
    if (!contactNumber) {
        return res.status(402).json({
            message: "Contact Field is required"
        })

    }
    if (!skills) {
        return res.status(402).json({
            message: "Skills field is required"
        })

    }
    if (!education) {
        return res.status(402).json({
            message: "education field is required"
        })

    }
    if (!experience) {
        return res.status(402).json({
            message: "experience field is required"
        })

    }

    next();
}

const isProfileExits = async (req, res, next) => {


    const profile = await Profile.findOne({
        userId: req.user._id
    }).select("-password _id");

    if (profile) {
        return res.status(409).json({
            message: "Profile is already created"

        })
    }

    next();

}
export {
    verifyProfileReqBody,
    isProfileExits
}