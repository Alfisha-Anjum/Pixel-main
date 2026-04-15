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
    <section className="bg-white max-w-[1240px] mx-auto pt-8 px-16">
      <h2 className="text-3xl font-semibold mb-6">About Us</h2>

      <p className="text-gray-600 mb-6">
        Welcome to <span className="font-semibold">TASPRO Company</span>by DEJA
        Tech LLC – where innovation meets convenience and transforms the way you
        connect with service professionals. We believe in the power of
        technology to simplify your life, making it easier than ever to find and
        hire independent service professionals who can meet your unique needs.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-2">Who are we?</h3>
      <p className="text-gray-600 mb-6">
        At DEJA Tech LLC, we take a customer-centric approach to developing
        intuitive service apps that prioritize your satisfaction and deliver
        exceptional experiences. Our team of dedicated experts combines
        cutting-edge technology with a deep understanding of your daily
        challenges, crafting solutions that seamlessly bridge the gap between
        you and the services you require.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-4">
        What makes TASPro Company the best?
      </h3>
      <p className="mb-6 text-[#414141]">
        We understand that finding the right professional can be time-consuming
        and daunting.
      </p>
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
