import express from "express";
import { verifyJwt } from "../middlewares/auth.mw.js";
import { createJob } from "../controllers/jobs.controllers.js";

const router = express.Router();

router.post("/createJob", [verifyJwt], createJob);

export default router;