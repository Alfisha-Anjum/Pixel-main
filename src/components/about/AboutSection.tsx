export default function AboutSection() {
  const points = [
    "We assure you peace of mind.",
    "We assure of honest and competitive pricing",
    "We assure you of quality workmanship",
    "We assure you of timely delivery",
    "We are reliable, reasonable and responsible",
    "We deliver what we have agreed",
    "Expect exceptional service quality and satisfaction",
    "Expect customer service par excellence",
    "We are more experienced and having team of experts in fixing the problems",
  ];

  return (
    <section className="max-w-6xl mx-auto py-16 px-6">
      <h2 className="text-3xl font-semibold mb-6">About Us</h2>

      <p className="text-gray-600 mb-6">
        Welcome to <span className="font-semibold">TASPRO Company</span>...
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-2">Who are we?</h3>
      <p className="text-gray-600 mb-6">
        At DEJA Tech LLC, we take a customer-centric approach...
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-4">
        What makes TASPro Company the best?
      </h3>

      <div className="space-y-4">
        {points.map((item, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="w-5 h-5 bg-green-600 rounded-md flex items-center justify-center text-white text-xs">
              ✓
            </div>
            <p className="text-gray-700">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
