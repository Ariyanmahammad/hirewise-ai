import Job from "../models/jobModel.js";

export const createJob = async (req, res) => {
  try {
    const {
      title,
      company,
      location,
      jobType,
      salary,
      experience,
      skillsRequired,
      description,
      deadline,
    } = req.body;

    if (!title || !company || !location || !jobType || !salary || !description || !deadline) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    const job = await Job.create({
      title,
      company,
      location,
      jobType,
      salary,
      experience,
      skillsRequired,
      description,
      deadline,
      createdBy: req.userId,
    });

    res.status(201).json({
      success: true,
      message: "Job created successfully",
      job,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};