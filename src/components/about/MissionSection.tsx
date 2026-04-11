import Image from "next/image";

export default function MissionSection() {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* LEFT */}
        <div>
          <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-600">
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomized words which don't look even slightly
            believable.but the majority have suffered alteration in some form,
            by injected humour, or randomized words which don't look even
            slightly believable.
          </p>
        </div>

        <div className="relative flex justify-center items-center">
          <Image
            src="/mission.png"
            alt="Mission Image"
            width={400}
            height={300}
          />
        </div>
      </div>
    </section>
  );
}
