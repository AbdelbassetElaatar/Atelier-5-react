export default function Button({
  children,
  textOnly = false,
  className = "",
  ...props
}) {
  const base = "px-6 py-2 rounded-md font-semibold transition-all duration-200";

  const filled = "bg-yellow-500 hover:bg-yellow-400";
  const text = " hover:text-yellow-400";

  return (
    <button
      className={`${base} ${textOnly ? text : filled} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
