import express from "express";
import {
  applyJob,
  getAllApplications,
} from "../controllers/applicationController.js";

import authMiddleware, {
  adminMiddleware,
} from "../middleware/authMiddleware.js";

const applicationRouter = express.Router();

applicationRouter.post(
  "/apply/:jobId",
  authMiddleware,
  applyJob
);

applicationRouter.get(
  "/",
  authMiddleware,
  adminMiddleware,
  getAllApplications
);

export default applicationRouter;