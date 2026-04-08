export default function Toggle({ icon, text, state, setState }) {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-3">
        <img src={icon} alt={text} className="w-5 h-5" />
        <span className="text-[15px] text-[#1B1B1B]">{text}</span>
      </div>

      {/* Toggle Switch */}
      <button
        onClick={() => setState(!state)}
        className={`w-10 h-6 flex items-center rounded-full p-1 transition ${
          state ? "bg-gradient-to-r from-[#FEC12D] to-[#FF552C]" : "bg-gray-300"
        }`}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
            state ? "translate-x-4" : ""
          }`}
        />
      </button>
    </div>
  );
}
