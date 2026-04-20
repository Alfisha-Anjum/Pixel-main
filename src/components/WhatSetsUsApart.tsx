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
    <section className="w-full max-w-[1240px] md:mx-0 flex flex-col lg:flex-row py-4 md:py-20">
      {/* LEFT SIDE */}
      <div className="w-full lg:w-1/2 bg-white md:px-0 py-12 flex flex-col justify-center md:pr-6px">
        <h2 className="text-3xl md:text-3xl font-semibold mb-4">
          What sets us apart?
        </h2>

        <p className="text-gray-500 mb-4 md:mb-10">
          There are many variations of passages of Lorem Ipsum
        </p>

        <div className="space-y-6">
          {features.map((item) => (
            <div key={item.id} className="flex items-start gap-4">
              {/* Number Circle */}
              <div
                className="min-w-[40px] h-[40px] md:min-w-[60px] md:h-[60px] flex items-center justify-center rounded-full text-white text-[20px] md:text-[30px]
                bg-gradient-to-r from-[#FF512F] to-[#F09819]"
              >
                {item.id}
              </div>

              {/* Text */}
              <div>
                <h3 className="text-[18] md:text-[22px]">{item.title}</h3>
                <p className="text-[13] md:text-[16px]">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT SIDE IMAGE */}
      <div
        className="hidden md:block 
      w-1/2 lg:w-1/2 h-[250px] lg:h-auto"
      >
        <img
          src="/img/officeview2.png"
          alt="office"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
}
