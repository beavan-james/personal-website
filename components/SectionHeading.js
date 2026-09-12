export default function SectionHeading({ kicker, title, blurb, tone = "dark" }) {
  const kickerColor = tone === "dark" ? "text-rose" : "text-rose-deep";
  const titleColor = tone === "dark" ? "text-cream" : "text-evergreen";
  const blurbColor = tone === "dark" ? "text-mist" : "text-taupe";
  return (
    <div className="reveal mb-8 min-w-0 max-w-2xl">
      <p className={`font-mono text-xs uppercase tracking-[0.25em] ${kickerColor}`}>
        ⌁ {kicker}
      </p>
      <h2 className={`font-display mt-4 text-2xl leading-[1.3] text-balance md:text-3xl ${titleColor}`}>
        {title}
      </h2>
      {blurb && <p className={`mt-3 max-w-xl text-base leading-relaxed ${blurbColor}`}>{blurb}</p>}
    </div>
  );
}
