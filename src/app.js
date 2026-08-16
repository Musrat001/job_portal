import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import profileRoutes from "./routes/profile.routes.js"
import cookieParser from "cookie-parser";




const app = express();

// app.use(multer());
app.use(cors());
app.use(express.json());
app.use(cookieParser())

// auth routes
app.use("/api/v1/auth", authRoutes);

// profile routes

app.use("/api/v1/profile", profileRoutes)


export default app;

