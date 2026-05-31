import Application from "../models/applicationModel.js";
import Job from "../models/jobModel.js";
import cloudinary from "../config/cloudinary.js";

export const applyJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { education, experience, skills } = req.body;

    if (!education || !skills) {
      return res.status(400).json({
        success: false,
        message: "Education and skills are required",
      });
    }

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }
   const requiredSkills = job.skillsRequired.map((skill) =>
  skill.toLowerCase().trim()
);

const skillsArray = Array.isArray(skills)
  ? skills
  : skills.split(",");

const candidateSkills = skillsArray.map((skill) =>
  skill.toLowerCase().trim()
);

const matchedSkills = job.skillsRequired.filter((skill) =>
  candidateSkills.includes(skill.toLowerCase().trim())
);

const missingSkills = job.skillsRequired.filter(
  (skill) => !candidateSkills.includes(skill.toLowerCase().trim())
);

const aiScore = Math.round(
  (matchedSkills.length / requiredSkills.length) * 100
);

    const alreadyApplied = await Application.findOne({
      candidate: req.userId,
      job: jobId,
    });

    if (alreadyApplied) {
      return res.status(400).json({
        success: false,
        message: "You have already applied for this job",
      });
    }

    let resumeUrl = "";

if (req.file) {
  const result = await cloudinary.uploader.upload(req.file.path, {
    folder: "hirewise/resumes",
    resource_type: "raw",
  });

  resumeUrl = result.secure_url;
}

   const application = await Application.create({
  candidate: req.userId,
  job: jobId,
  education,
  experience,
 skills: skillsArray,
    resumeUrl,
  aiScore,
  matchedSkills,
  missingSkills
  
});

    res.status(201).json({
      success: true,
      message: "Job application submitted successfully",
      application,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate("candidate", "name email phone")
      .populate("job", "title company");

    res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatus = [
      "Applied",
      "Under Review",
      "Shortlisted",
      "Interview Scheduled",
      "Selected",
      "Rejected",
    ];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid application status",
      });
    }

    const application = await Application.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    )
      .populate("candidate", "name email phone")
      .populate("job", "title company");

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Application status updated successfully",
      application,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      candidate: req.userId,
    })
      .populate(
        "job",
        "title company location salary"
      );

    res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};