import express from "express";
import { createProfile } from "../controllers/profile.controllers.js";
import { verifyJwt } from "../middlewares/auth.mw.js";
import { upload } from "../middlewares/multer.mw.js";
import { verifyProfileReqBody } from "../middlewares/profile.mw.js";

const router = express.Router();


router.post("/createProfile", [verifyJwt, upload.fields([
    {
        name: "avatar",
        maxCount: 1
    },
    {
        name: "resume",
        maxCount: 1
    }
]), verifyProfileReqBody,], createProfile)
// router.patch("/avatar",[verifyJWT, upload.single("avatar")], uploadFile)

export default router;