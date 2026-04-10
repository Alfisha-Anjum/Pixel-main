type GradientButtonProps = {
  text: string;
  width?: string;
  height?: string;
  onClick?: () => void;
  className?: string;
  textClassName?: string;
};

export default function GradientButton({
  text,
  width = "w-[180px]",
  height = "h-[44px]",
  onClick,
  className = "",
  textClassName = "text-[16px] font-semibold",
}: GradientButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`group ${width} ${height} p-[1px] rounded-lg bg-gradient-to-r from-[#FEC12D] to-[#FF552C] ${className}`}
    >
      <span className="flex items-center justify-center w-full h-full bg-white rounded-lg group-hover:bg-transparent transition-all duration-300">
        <span
          className={`bg-gradient-to-r from-[#FEC12D] to-[#FF552C] bg-clip-text text-transparent group-hover:text-white group-hover:bg-none transition-all duration-300 ${textClassName}`}
        >
          {text}
        </span>
      </span>
    </button>
  );
}
