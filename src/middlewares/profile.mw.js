const verifyProfileReqBody = (req, res) => {
    // const { dateOBirth, contactNumber, skills, education, experience } = req.body;
    const dateOBirth = req.body.dateOBirth;
    console.log("Date of Birth", dateOBirth);

    if (!dateOBirth) {
        return res.status(402).json({
            message: "Date of birth is required"
        })




    }
    next();
}
export {
    verifyProfileReqBody
}