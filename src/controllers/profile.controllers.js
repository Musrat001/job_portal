import Profile from "../models/profile.models.js";


const createProfile = async (req, res) => {
    const id = console.log(req.user._id);

    const profileObject = {
        userId: req.user._id,
        dateOBirth: req.body.dateOBirth,
        contactNumber: req.body.contactNumber,
        skills: req.body.skills,
        education: req.body.education,
        experience: req.body.experience,
        resume: req.body.resume
    }


    const profile = await Profile.create(profileObject);

    return res.status(201).json({
        message: "Your Profile is created",
        profile: profile
    })
}

export {
    createProfile
}