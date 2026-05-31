import { useState } from "react";
import api from "../services/api";

const ApplicationModal = ({ onClose, jobId }) => {
  const [education, setEducation] = useState("");
  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState("");
  const [resume, setResume] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        return;
      }

      const formData = new FormData();

      formData.append("education", education);
      formData.append("experience", experience);
      formData.append("skills", skills);

      if (resume) {
        formData.append("resume", resume);
      }

      const res = await api.post(
        `/applications/apply/${jobId}`,
        formData,
        {
          headers: {
            token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert(res.data.message);
      onClose();
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-lg rounded-3xl p-8 shadow-xl"
      >
        <h2 className="text-2xl font-bold mb-6">
          Apply for this job
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Education"
            value={education}
            onChange={(e) => setEducation(e.target.value)}
            className="w-full border rounded-xl px-4 py-3"
            required
          />

          <input
            type="text"
            placeholder="Experience"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="w-full border rounded-xl px-4 py-3"
          />

          <input
            type="text"
            placeholder="Skills comma separated e.g. React,Node.js,MongoDB"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className="w-full border rounded-xl px-4 py-3"
            required
          />

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">
              Upload Resume PDF
            </label>

            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setResume(e.target.files[0])}
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl border"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-5 py-2 rounded-xl bg-indigo-600 text-white"
          >
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApplicationModal;