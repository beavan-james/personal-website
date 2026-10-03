// `tagline` renders the blurb as a gold line with a short rule
// beneath it, for sections where the blurb leads into body copy.
export default function SectionHeading({ title, blurb, tagline = false }) {
  return (
    <div className={`reveal max-w-2xl ${tagline ? "mb-12" : "mb-10"}`}>
      <h2 className="font-display text-3xl leading-tight text-paper text-balance md:text-4xl">
        {title}
      </h2>
      {blurb &&
        (tagline ? (
          <>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-accent-dim">
              {blurb}
            </p>
            <span aria-hidden className="mt-6 block h-px w-16 bg-accent/60" />
          </>
        ) : (
          <p className="mt-3 max-w-xl text-base leading-relaxed text-silver">
            {blurb}
          </p>
        ))}
    </div>
  );
}
