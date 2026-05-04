interface ToggleProps {
  icon: string;
  text: string;
  state: boolean;
  setState: (value: boolean) => void;
}

export default function Toggle({ icon, text, state, setState }: ToggleProps) {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-3">
        <div className="dark:bg-gray-200 w-6 h-6 rounded-full flex items-center justify-center">
          <img src={icon} alt={text} className="w-5 h-5" />
        </div>
        <span className="text-[16px] font-medium text-[#1B1B1B] dark:text-gray-200">
          {text}
        </span>
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
