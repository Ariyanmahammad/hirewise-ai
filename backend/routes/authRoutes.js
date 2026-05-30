import express from "express";
import { registerUser, loginUser, getProfile } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.get("/profile", authMiddleware, getProfile);

export default authRouter;