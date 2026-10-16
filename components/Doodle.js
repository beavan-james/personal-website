// Small line-drawn icons for Field Notes section labels. They inherit
// currentColor, so set the color on the parent (usually text-accent-dim).
const paths = {
  record: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5.5" strokeDasharray="2 2.5" />
      <circle cx="12" cy="12" r="1.5" />
    </>
  ),
  book: (
    <>
      <path d="M12 6.5C10 5 7 4.5 3.5 5v13c3.5-.5 6.5 0 8.5 1.5 2-1.5 5-2 8.5-1.5V5C17 4.5 14 5 12 6.5Z" />
      <path d="M12 6.5v13" />
    </>
  ),
  carabiner: (
    <>
      <path d="M9 4.5c-3 0-4.5 2-4.5 5v5c0 3 1.5 5 4.5 5h4c4 0 6.5-2.5 6.5-6.5 0-5-3.5-8.5-8-8.5H9Z" />
      <path d="M8.5 8v8" />
    </>
  ),
  pan: (
    <>
      <circle cx="9.5" cy="12" r="6" />
      <path d="M15.5 12h6" />
      <path d="M7 10.5c.8-1 2-1.4 3-1" />
    </>
  ),
};

export default function Doodle({ name, className = "h-5 w-5" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {paths[name]}
    </svg>
  );
}
