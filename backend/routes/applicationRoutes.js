import express from "express";
import {
  applyJob,
  getAllApplications,
  updateApplicationStatus,
  getMyApplications,
  getApplicationStats,
} from "../controllers/applicationController.js";

import authMiddleware, {
  adminMiddleware,
} from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const applicationRouter = express.Router();

applicationRouter.post(
  "/apply/:jobId",
  authMiddleware,
  upload.single("resume"),
  applyJob
);

applicationRouter.get(
  "/",
  authMiddleware,
  adminMiddleware,
  getAllApplications
);
applicationRouter.get(
  "/my-applications",
  authMiddleware,
  getMyApplications
);

applicationRouter.get(
  "/stats",
  authMiddleware,
  adminMiddleware,
  getApplicationStats
);

applicationRouter.patch(
  "/:id/status",
  authMiddleware,
  adminMiddleware,
  updateApplicationStatus
);

export default applicationRouter;