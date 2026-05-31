import { useEffect, useState } from "react";
import api from "../services/api";

const AdminApplications = () => {
  const [applications, setApplications] = useState([]);

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/applications", {
        headers: { token },
      });

      setApplications(res.data.applications);
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to fetch applications");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.patch(
        `/applications/${id}/status`,
        { status },
        { headers: { token } },
      );

      alert(res.data.message);
      fetchApplications();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update status");
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 px-8 py-16">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-10">Candidate Applications</h1>

        <div className="space-y-6">
          {applications.map((app) => (
            <div key={app._id} className="bg-white rounded-3xl p-6 shadow-sm">
              <div className="grid md:grid-cols-4 gap-6 items-start">
                <div>
                  <h2 className="text-xl font-bold">
                    {app.candidate?.name || "Unknown Candidate"}
                  </h2>
                  <p className="text-slate-600">
                    {app.candidate?.email || "No Email"}
                  </p>
                  <p className="text-slate-500">
                    {app.candidate?.phone || "No Phone"}
                  </p>
                </div>

                <div>
                  <p className="font-semibold">
                    {app.job?.title || "Unknown Job"}
                  </p>
                  <p className="text-slate-600">
                    {app.job?.company || "No Company"}
                  </p>
                  <p className="text-sm text-slate-500">
                    {app.education} • {app.experience}
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-indigo-600">
                    AI Score: {app.aiScore}%
                  </p>

                  <p className="mt-2 text-sm">
                    Status: <span className="font-semibold">{app.status}</span>
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {app.matchedSkills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => updateStatus(app._id, "Shortlisted")}
                    className="bg-green-600 text-white px-4 py-2 rounded-xl"
                  >
                    Shortlist
                  </button>

                  <button
                    onClick={() => updateStatus(app._id, "Rejected")}
                    className="bg-red-500 text-white px-4 py-2 rounded-xl"
                  >
                    Reject
                  </button>

                  <button
                    onClick={() => updateStatus(app._id, "Selected")}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-xl"
                  >
                    Select
                  </button>
                </div>
              </div>
            </div>
          ))}

          {applications.length === 0 && (
            <p className="text-slate-500">No applications found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminApplications;
