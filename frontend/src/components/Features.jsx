import { Brain, Briefcase, Users } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Brain size={40} />,
      title: "AI Candidate Scoring",
      description:
        "Automatically match candidate skills with job requirements.",
    },
    {
      icon: <Briefcase size={40} />,
      title: "Smart Job Management",
      description:
        "Create, manage and track jobs from a centralized dashboard.",
    },
    {
      icon: <Users size={40} />,
      title: "Application Tracking",
      description:
        "Monitor candidate applications and recruitment status easily.",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-8">
        <h2 className="text-4xl font-bold text-center mb-14">
          Why Choose HireWise AI?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-slate-50 p-8 rounded-3xl shadow-sm hover:shadow-lg transition"
            >
              <div className="text-indigo-600 mb-5">
                {feature.icon}
              </div>

              <h3 className="text-xl font-semibold mb-3">
                {feature.title}
              </h3>

              <p className="text-slate-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;