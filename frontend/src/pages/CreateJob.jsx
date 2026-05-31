import { useState } from "react";
import api from "../services/api";

const CreateJob = () => {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    jobType: "",
    salary: "",
    experience: "",
    skillsRequired: "",
    description: "",
    deadline: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const payload = {
        ...formData,
        skillsRequired: formData.skillsRequired
          .split(",")
          .map((skill) => skill.trim()),
      };

      const res = await api.post(
        "/jobs/create",
        payload,
        {
          headers: {
            token,
          },
        }
      );

      alert(res.data.message);

      setFormData({
        title: "",
        company: "",
        location: "",
        jobType: "",
        salary: "",
        experience: "",
        skillsRequired: "",
        description: "",
        deadline: "",
      });
    } catch (error) {
      alert(error.response?.data?.message || "Failed to create job");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-8 py-16">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-3xl shadow-lg">

        <h1 className="text-3xl font-bold mb-8">
          Create Job
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            name="title"
            placeholder="Job Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-xl"
          />

          <input
            name="company"
            placeholder="Company"
            value={formData.company}
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-xl"
          />

          <input
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-xl"
          />

          <input
            name="jobType"
            placeholder="Job Type"
            value={formData.jobType}
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-xl"
          />

          <input
            name="salary"
            placeholder="Salary"
            value={formData.salary}
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-xl"
          />

          <input
            name="experience"
            placeholder="Experience"
            value={formData.experience}
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-xl"
          />

          <input
            name="skillsRequired"
            placeholder="Skills (React, Node.js, MongoDB)"
            value={formData.skillsRequired}
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-xl"
          />

          <textarea
            name="description"
            placeholder="Job Description"
            value={formData.description}
            onChange={handleChange}
            rows="5"
            className="w-full border px-4 py-3 rounded-xl"
          />

          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-xl"
          />

          <button
            type="submit"
            className="bg-indigo-600 text-white px-8 py-3 rounded-xl"
          >
            Create Job
          </button>
        </form>

      </div>
    </div>
  );
};

export default CreateJob;