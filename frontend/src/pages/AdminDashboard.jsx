import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalApplications: 0,
    shortlisted: 0,
    selected: 0,
    rejected: 0,
    averageScore: 0,
  });

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/applications/stats", {
        headers: { token },
      });

      setStats(res.data.stats);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const cards = [
    {
      title: "Total Applications",
      value: stats.totalApplications,
    },
    {
      title: "Shortlisted",
      value: stats.shortlisted,
    },
    {
      title: "Selected",
      value: stats.selected,
    },
    {
      title: "Rejected",
      value: stats.rejected,
    },
    {
      title: "Average AI Score",
      value: `${stats.averageScore}%`,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 px-8 py-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-10">
          Admin Dashboard
        </h1>

        <div className="grid md:grid-cols-5 gap-6 mb-10">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-3xl shadow-sm"
            >
              <p className="text-slate-500 text-sm">
                {card.title}
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {card.value}
              </h2>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Link
            to="/admin/create-job"
            className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-lg transition"
          >
            <h2 className="text-2xl font-bold mb-2">Create Job</h2>
            <p className="text-slate-600">
              Post new job openings for candidates.
            </p>
          </Link>

          <Link
            to="/admin/applications"
            className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-lg transition"
          >
            <h2 className="text-2xl font-bold mb-2">
              Applications
            </h2>
            <p className="text-slate-600">
              View candidates, AI scores and statuses.
            </p>
          </Link>

          <Link
            to="/jobs"
            className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-lg transition"
          >
            <h2 className="text-2xl font-bold mb-2">View Jobs</h2>
            <p className="text-slate-600">
              See all published job listings.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;