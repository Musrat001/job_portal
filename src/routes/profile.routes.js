import express from "express";
import { createProfile } from "../controllers/profile.controllers.js";
import { verifyJwt } from "../middlewares/auth.mw.js";

const router = express.Router();


router.post("/createProfile", [verifyJwt], createProfile)

export default router;