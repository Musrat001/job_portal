import express from "express";
import { verifyJwt } from "../middlewares/auth.mw.js";
import { createJob, updateJob } from "../controllers/jobs.controllers.js";

const router = express.Router();

router.post("/createJob", [verifyJwt], createJob);
router.patch("/updateJob", [verifyJwt], updateJob);

export default router;