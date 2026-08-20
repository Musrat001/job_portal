import express from "express";
import { createProfile, updateProfile, updateAvatar } from "../controllers/profile.controllers.js";
import { verifyJwt } from "../middlewares/auth.mw.js";
import { upload } from "../middlewares/multer.mw.js";
import { verifyProfileReqBody, isProfileExits } from "../middlewares/profile.mw.js";

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
]), verifyProfileReqBody, isProfileExits], createProfile)
// router.patch("/avatar",[verifyJWT, upload.single("avatar")], uploadFile)
router.patch("/updateProfile", [verifyJwt], updateProfile);
// avatar upadte route

router.patch("/updateAvatar", [verifyJwt, upload.single("avatar")
], updateAvatar)

export default router;