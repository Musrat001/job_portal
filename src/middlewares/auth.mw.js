import User from "../models/user.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"


const verifyJwt = async (req, res, next) => {
    const token = req.cookies.accessToken;
    if (!token) {
        return res.status(401).json({
            message: "Please Provide access token"
        })
    }

    try {
        const decoded = await jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET
        );
        const user = await User.findById(decoded._id);
        if (!user) {
            return res.status(402).json({
                message: "User has already been deleted"
            })
        }
        req.user = user;
    } catch (er) {
        return res.status(402).json({
            message: "Invalid Token",
            error: er.message
        })
    }

    next();
}

const checkUserReqBody = async (req, res, next) => {

    const name = req.body.name;
    if (!name) {
        return res.status(400).json({
            message: "Please provide name!"
        })
    }

    const username = req.body.username;
    if (!username) {
        return res.status(400).json({
            message: "Please provide username"
        })
    }

    const email = req.body.email;
    if (!email) {
        return res.status(400).json({
            message: "Please provide email"
        })
    }

    const password = req.body.password;
    if (!password) {
        return res.status(400).json({
            message: "Please provide password"
        })
    }

    next();
}


const checkLoginBody = async (req, res, next) => {
    const { identifier, password } = req.body;
    if (!identifier) {
        return res.status(400).json({
            message: "Please provide username / email for login"
        })
    }

    if (!password) {
        return res.status(400).json({
            message: "Please provide password"
        })
    }

    next();
}





const isEmailOrUsernameExist = async (req, res, next) => {
    const { username, email } = req.body;

    const isUserExist = await User.findOne({
        $or: [
            { email },
            { username }
        ]
    })
    console.log(isUserExist);

    if (isUserExist) {
        return res.status(409).json({
            message: "Email or Username is already exist"
        })
    }
    next();
}


export {
    checkUserReqBody,
    checkLoginBody,
    verifyJwt,
    isEmailOrUsernameExist
}