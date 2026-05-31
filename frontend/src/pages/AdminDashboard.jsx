import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-slate-50 px-8 py-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-10">
          Admin Dashboard
        </h1>

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
            <h2 className="text-2xl font-bold mb-2">Applications</h2>
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