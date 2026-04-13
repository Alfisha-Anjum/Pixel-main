"use client";

import Image from "next/image";

const values = [
  { title: "Transparency", icon: "/icons/transparency.png" },
  { title: "Accountability", icon: "/icons/accountability.png" },
  { title: "Professionalism", icon: "/icons/professionalism.png" },
  { title: "Quality Excellence", icon: "/icons/quality.png" },
  { title: "One Stop Solution", icon: "/icons/solution.png" },
];

const Item = ({ item, index }: any) => {
  const isTop = index % 2 !== 0; // 2nd, 4th → text upar

  return (
    <div className="flex flex-col items-center text-center max-w-[180px]">
      {/* TEXT TOP */}
      {isTop && (
        <>
          <h4 className="mb-2 font-medium">{item.title}</h4>
          <p className="text-sm text-gray-500 mb-3">
            There are many variations of passages of Lorem Ipsum available...
          </p>
        </>
      )}

      {/* CIRCLE */}
      <div className="w-24 h-24 rounded-full border-2 border-dashed border-orange-400 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full border-4 border-orange-500 bg-white flex items-center justify-center">
          <Image src={item.icon} alt={item.title} width={30} height={30} />
        </div>
      </div>

      {/* TEXT BOTTOM */}
      {!isTop && (
        <>
          <h4 className="mt-4 font-medium">{item.title}</h4>
          <p className="text-sm text-gray-500">
            There are many variations of passages of Lorem Ipsum available...
          </p>
        </>
      )}
    </div>
  );
};

export default function CoreValues() {
  return (
    <section className="bg-[#f5f5f5] py-20">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-semibold mb-2">Our Core Values</h2>
        <p className="text-gray-500 mb-20">
          There are many variations of passages of Lorem Ipsum
        </p>

        <div className="relative max-w-6xl mx-auto">
          {/* GRID */}
          <div className="flex justify-between align-items-stretch gap-y-28 relative z-10 justify-items-center">
            {/* TOP ROW */}
            <Item item={values[0]} index={0} />
            <Item item={values[1]} index={1} />
            <Item item={values[3]} index={2} />

            {/* BOTTOM ROW */}

            {/* 3 → BETWEEN 1 & 2 */}
            <div className="col-start-2">
              <Item item={values[2]} index={3} />
            </div>

            {/* 5 → BELOW 4 */}
            <div className="col-start-3">
              <Item item={values[4]} index={4} />
            </div>
            <svg
              className="absolute top-0 left-0 w-full h-full pointer-events-none"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {/* 1 → 3 */}
              <line
                x1="12"
                y1="30"
                x2="32"
                y2="70"
                stroke="#fb923c"
                strokeWidth="0.6"
                strokeDasharray="2,2"
              />

              {/* 3 → 2 */}
              <line
                x1="32"
                y1="70"
                x2="48"
                y2="30"
                stroke="#fb923c"
                strokeWidth="0.6"
                strokeDasharray="2,2"
              />

              {/* 2 → 4 */}
              <line
                x1="48"
                y1="30"
                x2="72"
                y2="70"
                stroke="#fb923c"
                strokeWidth="0.6"
                strokeDasharray="2,2"
              />

              {/* 4 → 5 */}
              <line
                x1="72"
                y1="70"
                x2="88"
                y2="30"
                stroke="#fb923c"
                strokeWidth="0.6"
                strokeDasharray="2,2"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
