export default function Button({ children, textOnly = false, ...props }) {
  let cssClasses = 'button';

  if (textOnly) {
    cssClasses = 'text-button';
  }

  return (
    <button className={cssClasses} {...props}>
      {children}
    </button>
  );
}
export default function Button({ children, textOnly = false, ...props }) {
  const base =
    'px-6 py-2 rounded-md font-semibold transition-all duration-200';

  const filled =
    'bg-yellow-500 text-black hover:bg-yellow-400';

  const text =
    'text-yellow-500 hover:text-yellow-400';

  return (
    <button
      className={`${base} ${textOnly ? text : filled}`}
      {...props}
    >
      {children}
    </button>
  );
}
