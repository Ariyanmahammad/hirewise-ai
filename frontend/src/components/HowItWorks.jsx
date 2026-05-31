const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Post a Job",
      description: "Recruiters create and publish job openings."
    },
    {
      number: "02",
      title: "Candidates Apply",
      description: "Applicants submit their profiles and resumes."
    },
    {
      number: "03",
      title: "AI Screening",
      description: "HireWise AI scores and ranks candidates."
    },
    {
      number: "04",
      title: "Hire Faster",
      description: "Recruiters shortlist and manage candidates."
    }
  ];

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-8">
        <h2 className="text-4xl font-bold text-center mb-14">
          How It Works
        </h2>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-white p-8 rounded-3xl shadow-sm"
            >
              <div className="text-4xl font-bold text-indigo-600 mb-4">
                {step.number}
              </div>

              <h3 className="text-xl font-semibold mb-3">
                {step.title}
              </h3>

              <p className="text-slate-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;