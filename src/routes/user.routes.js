import express from "express";
import { forgetPassword } from "../controllers/user.controllers.js";
import multer from "multer";


const upload = multer();
const router = express.Router();

// use multer and upload.none() if you are sending data from postman as form data not as simple json data
// router.patch("/forgetPassword", [upload.none()], forgetPassword);
router.patch("/forgetPassword", forgetPassword);


export default router;