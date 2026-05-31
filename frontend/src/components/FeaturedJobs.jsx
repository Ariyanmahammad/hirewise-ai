import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

const FeaturedJobs = () => {
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
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-8">
        <h2 className="text-4xl font-bold text-center mb-14">Featured Jobs</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobs.map((job) => (
            <Link
              to={`/jobs/${job._id}`}
              key={job._id}
              className="border rounded-3xl p-6 shadow-sm hover:shadow-lg transition block"
            >
              <h3 className="text-2xl font-bold mb-3">{job.title}</h3>

              <p className="text-slate-600 mb-2">{job.company}</p>

              <p className="text-slate-500 mb-2">📍 {job.location}</p>

              <p className="text-indigo-600 font-semibold">{job.salary}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedJobs;
