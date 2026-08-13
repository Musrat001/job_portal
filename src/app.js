import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";


const app = express();


app.use(cors());
app.use(express.json());
app.use(cookieParser())
app.use("/api/v1/auth", authRoutes);

app.get("/", () => {
    console.log("Backend server is running!");
});

export default app;

