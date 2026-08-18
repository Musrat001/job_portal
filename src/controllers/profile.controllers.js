import Profile from "../models/profile.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";


const createProfile = async (req, res) => {
    // const id = console.log(req.user._id);
    console.log(req.body);
    const education = JSON.parse(req.body.education);
    const experience = JSON.parse(req.body.experience);
    const skills = JSON.parse(req.body.skills);


    const avatarLocalPath = req.files?.avatar[0]?.path;
    const resumeLocalPath = req.files?.resume[0]?.path;
    // console.log(avatarLocalPath);

    if (!avatarLocalPath) {
        return res.status(404).json({
            message: "avatar path is required"
        })
    }

    if (!resumeLocalPath) {
        return res.status(404).json({
            message: "resume path is required"
        })
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const resume = await uploadOnCloudinary(resumeLocalPath);
    if (!avatar) {
        return res.status(401).json({
            message: "Avatar is missing"
        })
    }

    if (!resume) {
        return res.status(401).json({
            message: "resume is missing"
        })
    }
    // console.log("Avatar Uploaded Succesfully!", avatar);
    // console.log("resume Uploaded Succesfully!", resume);

    const profileObject = {
        userId: req.user._id,
        dateOfBirth: req.body.dateOfBirth,
        contactNumber: req.body.contactNumber,
        skills: skills,
        education: education,
        experience: experience,
        avatar: avatar?.url,
        resume: resume?.url
    }


    const profile = await Profile.create(profileObject);

    return res.status(201).json({
        message: "Your Profile is created",
        profile: profile
    })
}

// const uploadFile = async (req, res) => {

//     const avatarLocalPath = req.files?.avatar[0]?.path;
//     if (!avatarLocalPath) {
//         return res.status(404).json({
//             message: "avatar path is required"
//         })
//     }

//     const avatar = await uploadOnCloudinary(avatarLocalPath);
//     console.log("Avatar Uploaded Succesfully!", avatar);
// }

export {
    createProfile
    // uploadFile
}