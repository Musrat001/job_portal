import express from "express";
import { logOut, registerUser, userLogin } from "../controllers/auth.controllers.js"
const router = express.Router();
router.post("/register", registerUser)
router.post("/login", userLogin)
router.get("/logout", logOut)


export default router;

