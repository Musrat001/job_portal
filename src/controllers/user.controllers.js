import User from "../models/user.models.js";

const forgetPassword = async (req, res) => {

    console.log(req.body);

    const { identifier, password } = req.body;



    // problem: not able to login because user has forget his password
    // check user exits 
    // then update password by using the email or username

    const user = await User.findOne({
        $or: [
            {
                email: identifier
            },
            {
                username: identifier
            }
        ]
    });
    if (!user) {
        return res.status(404).json({
            message: "The email or username doesnot exist"
        })
    }

    const updatedUser = await User.findOneAndUpdate(
        {
            $or: [
                {
                    email: identifier
                },
                {
                    username: identifier
                }
            ]
        },
        {
            $set: {
                password: password
            }
        },
        {
            returnDocument: "after"
        }
    )

    return res.status(201).json({
        message: "Password Updated Successfully"
    })


}

export {
    forgetPassword
}