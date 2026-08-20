import express from "express";
import { logOut, registerUser, userLogin } from "../controllers/auth.controllers.js"
import { checkUserReqBody, checkLoginBody, verifyJwt, isEmailOrUsernameExist } from "../middlewares/auth.mw.js";
const router = express.Router();
router.post("/register", [checkUserReqBody, isEmailOrUsernameExist], registerUser)
router.post("/login", [checkLoginBody], userLogin)
router.get("/logout", [verifyJwt], logOut)


export default router;

