import { useEffect, useState } from "react";
import api from "../services/api";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get(
        "/applications/my-applications",
        {
          headers: {
            token,
          },
        }
      );

      setApplications(res.data.applications);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 px-8 py-16">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold mb-10">
          My Applications
        </h1>

        <div className="space-y-6">
          {applications.map((app) => (
            <div
              key={app._id}
              className="bg-white rounded-3xl p-6 shadow-sm"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">
                    {app.job.title}
                  </h2>

                  <p className="text-slate-600">
                    {app.job.company}
                  </p>

                  <p className="text-slate-500">
                    {app.job.location}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-semibold text-indigo-600">
                    AI Score: {app.aiScore}%
                  </p>

                  <p className="text-sm mt-2">
                    Status: {app.status}
                  </p>
                </div>
              </div>

              <div className="mt-5">
                <p className="font-medium mb-2">
                  Matched Skills
                </p>

                <div className="flex gap-2 flex-wrap">
                  {app.matchedSkills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <p className="font-medium mb-2">
                  Missing Skills
                </p>

                <div className="flex gap-2 flex-wrap">
                  {app.missingSkills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default MyApplications;