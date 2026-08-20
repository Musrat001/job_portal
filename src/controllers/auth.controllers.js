import User from "../models/user.models.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateAccessToken } from "../utils/generateAccessToken.js";

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

    const user = await User.create(userObject);
    return res.status(201).json({
        message: "User Registered Successfully!",
        user: user
    });
}


const userLogin = async (req, res) => {
    const { identifier, password } = req.body;

    const user = await User.findOne({
        $or: [
            {
                username: identifier
            },
            {
                email: identifier
            }
        ],
    });
    if (!user) {
        return res.status(401).json({
            message: "User Doesnot exits"
        })
    }

    const isPasswordValid = await bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
        return res.status(409).json({
            message: "Password is Incorrect, please try again"
        })
    }

    // const accessToken = jwt.sign(
    //     {
    //         user: user

    //     },
    //     process.env.ACCESS_TOKEN_SECRET,
    //     {
    //         expiresIn: 300
    //     }
    // );
    console.log(user);


    const accessToken = await generateAccessToken(user._id);

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