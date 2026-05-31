import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    try {
      const res = await api.get("/jobs");
      setJobs(res.data.jobs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 px-8 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-slate-900">
            Explore Jobs
          </h1>
          <p className="text-slate-600 mt-2">
            Find opportunities that match your skills and career goals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-lg transition"
            >
              <h2 className="text-2xl font-bold mb-2">
                {job.title}
              </h2>

              <p className="text-slate-600 mb-2">
                {job.company}
              </p>

              <p className="text-slate-500 mb-2">
                📍 {job.location}
              </p>

              <p className="text-indigo-600 font-semibold mb-4">
                {job.salary}
              </p>

              <div className="flex flex-wrap gap-2 mb-5">
                {job.skillsRequired.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-indigo-100 text-indigo-700 text-sm px-3 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <Link
                to={`/jobs/${job._id}`}
                className="inline-block bg-indigo-600 text-white px-5 py-2 rounded-xl"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Jobs;