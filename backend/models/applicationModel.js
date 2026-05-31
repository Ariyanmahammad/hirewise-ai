import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    candidate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },

    education: {
      type: String,
      required: true,
    },

    experience: {
      type: String,
      default: "Fresher",
    },

    skills: [
      {
        type: String,
      },
    ],

    resumeUrl: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: [
        "Applied",
        "Under Review",
        "Shortlisted",
        "Interview Scheduled",
        "Selected",
        "Rejected",
      ],
      default: "Applied",
    },

    aiScore: {
      type: Number,
      default: 0,
    },

    matchedSkills: [
      {
        type: String,
      },
    ],

    missingSkills: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

const Application = mongoose.model("Application", applicationSchema);

export default Application;