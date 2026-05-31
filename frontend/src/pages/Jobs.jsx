import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");

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

  const filteredJobs = jobs.filter((job) => {
    const searchMatch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.skillsRequired.join(" ").toLowerCase().includes(search.toLowerCase());

    const locationMatch = job.location
      .toLowerCase()
      .includes(location.toLowerCase());

    return searchMatch && locationMatch;
  });

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

        <div className="bg-white p-6 rounded-3xl shadow-sm mb-10 grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Search by title, company or skill"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-4 py-3 rounded-xl w-full"
          />

          <input
            type="text"
            placeholder="Filter by location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border px-4 py-3 rounded-xl w-full"
          />
        </div>

        <p className="text-slate-600 mb-6">
          Showing {filteredJobs.length} jobs
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredJobs.map((job) => (
            <div
              key={job._id}
              className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-lg transition"
            >
              <h2 className="text-2xl font-bold mb-2">{job.title}</h2>

              <p className="text-slate-600 mb-2">{job.company}</p>

              <p className="text-slate-500 mb-2">📍 {job.location}</p>

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

        {filteredJobs.length === 0 && (
          <p className="text-slate-500 mt-10 text-center">
            No jobs found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Jobs;