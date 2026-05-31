import express from "express";
import { applyJob } from "../controllers/applicationController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const applicationRouter = express.Router();

applicationRouter.post("/apply/:jobId", authMiddleware, applyJob);

export default applicationRouter;