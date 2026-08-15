import User from "../models/user.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


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


        const user = await User.findById(decoded.user._id);

        req.user = user;
        console.log("decoded = ", decoded);
        console.log("user = ", user);


    } catch (er) {
        return res.status(402).json({
            message: "Invalid Token"
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
    const username = req.body.username;
    if (!username) {
        return res.status(400).json({
            message: "Please provide username"
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


const verifyLoginCredentials = async (req, res, next) => {
    const username = req.body.username;
    const user = await User.findOne({ username });
    if (!username) {
        return res.status(404).json({
            message: `User with username ${username} doesnot exits`
        });
    }

    const password = req.body.password;
    const isPasswordCorrect = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordCorrect) {
        return res.status(404).json({
            message: "Password is Wrong"
        })
    }

    next();
}


export {
    checkUserReqBody,
    checkLoginBody,
    verifyLoginCredentials,
    verifyJwt
}