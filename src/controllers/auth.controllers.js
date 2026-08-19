import User from "../models/user.models.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {

    const password = req.body.password;
    const hashPassword = bcrypt.hashSync(password, 10)
    const userObject = {
        name: req.body.name,
        username: req.body.username,
        password: hashPassword,
        email: req.body.email,
        userType: req.body.userType
    }

    const user = await User.create(userObject).select("-password");
    return res.status(201).json({
        message: "User Registered Successfully!",
        user: user
    });
}


const userLogin = async (req, res) => {
    const loginObject = {
        username: req.body.username

    }

    const user = await User.findOne(loginObject).select("-password");
    if (!user) {
        return res.status(401).json({
            message: "User Doesnot exits"
        })
    }
    const accessToken = jwt.sign(
        {
            user: user

        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: 300
        }
    );

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none"
    });

    return res.status(201).json({
        message: "You logged In successfully",
        accessToken: accessToken

    })
}

const logOut = async (req, res) => {
    try {
        res.clearCookie("accessToken");
        return res.status(200).json({
            message: "Logout Successfully"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Logout Failed !"
        })
    }
}

export {
    registerUser,
    userLogin,
    logOut
}