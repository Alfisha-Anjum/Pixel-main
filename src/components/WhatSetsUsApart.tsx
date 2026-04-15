"use client";

const features = [
  {
    id: 1,
    title: "Lorem Ipsum Dolor",
    desc: "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 2,
    title: "Lorem Ipsum Dolor",
    desc: "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 3,
    title: "Lorem Ipsum Dolor",
    desc: "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 4,
    title: "Lorem Ipsum Dolor",
    desc: "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 5,
    title: "Lorem Ipsum Dolor",
    desc: "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

export default function WhatSetsUsApart() {
  return (
    <section className="w-[1240] h-[750px] flex flex-col lg:flex-row">
      {/* LEFT SIDE */}
      <div className="w-full lg:w-1/2 bg-white px-6 md:px-16 py-12 flex flex-col justify-center">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">
          What sets us apart?
        </h2>

        <p className="text-gray-500 mb-10">
          There are many variations of passages of Lorem Ipsum
        </p>

        <div className="space-y-6">
          {features.map((item) => (
            <div key={item.id} className="flex items-start gap-4">
              {/* Number Circle */}
              <div
                className="min-w-[60px] h-[60px] flex items-center justify-center rounded-full text-white text-[30px]
                bg-gradient-to-r from-[#FF512F] to-[#F09819]"
              >
                {item.id}
              </div>

              {/* Text */}
              <div>
                <h3 className="text-[22px]">{item.title}</h3>
                <p className="text-[16px]">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT SIDE IMAGE */}
      <div className="w-full lg:w-1/2 h-[300px] lg:h-auto">
        <img
          src="/img/officeview.png"
          alt="office"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
}
