import express from "express";
import { createJob, getAllJobs, getJobById } from "../controllers/jobController.js";
import authMiddleware, { adminMiddleware } from "../middleware/authMiddleware.js";

const jobRouter = express.Router();

jobRouter.get("/", getAllJobs);
jobRouter.get("/:id", getJobById);
jobRouter.post("/create", authMiddleware, adminMiddleware, createJob);



export default jobRouter;