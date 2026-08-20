import Profile from "../models/profile.models.js";
import User from "../models/user.models.js";
import cookieParser from "cookie-parser";


const forgetPassword = async (req, res) => {

    console.log(req.body);

    const { identifier, password } = req.body;
    const hashedPassword = await bcrypt.hashSync(password, 10);


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
                password: hashedPassword
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


const updatePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const hashedPassword = await bcrypt.hashSync(newPassword, 10);
    const user = await User.findOneAndUpdate(
        {
            _id: req.user._id
        }
        ,
        {
            password: hashedPassword
        },
        {
            returnDocument: "after"
        }
    );

    return res.status(201).json({
        message: "Password Updated Successfully"
    })
}


const deleteAccount = async (req, res) => {
    // getting user _id from jwt token

    const userId = req.user._id;

    try {
        const profile = await Profile.findOneAndDelete({
            userId: req.user._id
        })
        // deleting account 
        const user = await User.findByIdAndDelete({
            _id: userId
        });

        // deleting the profile as well




        // clearing accessToken 
        res.clearCookie("accessToken");
        return res.status(201).json({
            message: "Account Deleted Successfully!",
            deletdUser: user,
            userProfile: profile
        })
    } catch (error) {
        return res.status(402).json({
            message: "Error While Deleting the Account",
            error: error.message
        })
    }


}

export {
    forgetPassword,
    updatePassword,
    deleteAccount
}