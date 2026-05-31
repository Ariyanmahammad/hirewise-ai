import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import ApplicationModal from "../components/ApplicationModal";

const JobDetails = () => {
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchJob = async () => {
    try {
      const res = await api.get(`/jobs/${id}`);
      setJob(res.data.job);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchJob();
  }, [id]);

  if (!job) {
    return (
      <div className="flex justify-center items-center h-screen text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-8 py-16">
      <div className="bg-white shadow-lg rounded-3xl p-8">
        <h1 className="text-4xl font-bold mb-4">{job.title}</h1>

        <p className="text-xl text-slate-600 mb-2">{job.company}</p>

        <p className="text-slate-500 mb-2">📍 {job.location}</p>

        <p className="text-indigo-600 font-semibold text-lg mb-6">
          {job.salary}
        </p>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">Required Skills</h2>

          <div className="flex flex-wrap gap-3">
            {job.skillsRequired.map((skill, index) => (
              <span
                key={index}
                className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3">Job Description</h2>

          <p className="text-slate-600 leading-relaxed">{job.description}</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="mt-8 bg-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-indigo-700"
        >
          Apply Now
        </button>
      </div>
      {showModal && (
        <ApplicationModal jobId={id} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default JobDetails;
