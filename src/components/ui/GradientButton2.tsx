type Props = {
  text: string;
  onClick?: () => void;
  width?: string;
  height?: string;
  type?: "button" | "submit";
  className?: string;
};

export default function GradientButton2({
  text,
  onClick,
  width = "w-full",
  height = "h-[48px]",
  type = "button",
  className = "",
}: Props) {
  return (
    <button
      onClick={onClick}
      className={`
        ${width} ${height}
        rounded-full
        bg-gradient-to-r from-[#FF512F] to-[#F09819]
        text-white font-medium
        shadow-lg
        flex items-center justify-center
        transition hover:scale-[1.02] active:scale-[0.98]
        ${className}
      `}
    >
      {text}
    </button>
  );
}
