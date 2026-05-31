import { Link } from "react-router-dom";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";

const Home = () => {
  return (
    <>
    <section className="min-h-[90vh] bg-slate-50 flex items-center px-8">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        
        <div>
          <p className="text-indigo-600 font-semibold mb-3">
            AI-Powered Recruitment Platform
          </p>

          <h1 className="text-5xl font-bold text-slate-900 leading-tight">
           Hire the right talent faster with AI-powered recruitment
          </h1>

          <p className="text-slate-600 mt-5 text-lg">
            HireWise AI helps recruiters post jobs, track applications,
            score candidates, and manage interviews from one modern dashboard.
          </p>

          <div className="flex gap-4 mt-8">
            <Link
              to="/jobs"
              className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium"
            >
              Browse Jobs
            </Link>

            <Link
              to="/register"
              className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-xl font-medium"
            >
              Get Started
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-6">
          <div className="bg-indigo-50 rounded-2xl p-5">
            <h2 className="text-xl font-bold text-slate-800 mb-4">
              AI Candidate Match
            </h2>

            <div className="space-y-4">
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <p className="font-semibold">MERN Developer Intern</p>
                <p className="text-sm text-slate-500">AI Score: 75%</p>
              </div>

              <div className="bg-white p-4 rounded-xl shadow-sm">
                <p className="font-semibold">Matched Skills</p>
                <p className="text-sm text-green-600">
                  React, Node.js, MongoDB
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl shadow-sm">
                <p className="font-semibold">Missing Skill</p>
                <p className="text-sm text-red-500">Express</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
    <Features />
    <HowItWorks />
    </>
  );
};

export default Home;