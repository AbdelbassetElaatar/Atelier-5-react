export default function Input({ label, id, ...props }) {
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block mb-1 text-sm font-medium text-gray-800"
      >
        {label}
      </label>

      <input
        id={id}
        {...props}
        className="
          w-full
          rounded-md
          border border-gray-300
          px-3 py-2
          focus:outline-none
          focus:ring-2
          focus:ring-yellow-500
        "
      />
    </div>
  );
}
