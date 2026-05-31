import express from "express";
import { createJob } from "../controllers/jobController.js";
import authMiddleware, { adminMiddleware } from "../middleware/authMiddleware.js";

const jobRouter = express.Router();

jobRouter.post("/create", authMiddleware, adminMiddleware, createJob);

export default jobRouter;