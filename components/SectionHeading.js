export default function SectionHeading({ kicker, title, blurb, tone = "dark" }) {
  const kickerColor = tone === "dark" ? "text-rose" : "text-rose-deep";
  const titleColor = tone === "dark" ? "text-cream" : "text-evergreen";
  const blurbColor = tone === "dark" ? "text-mist" : "text-taupe";
  return (
    <div className="reveal mb-10 max-w-2xl">
      <p className={`font-mono text-xs uppercase tracking-[0.25em] ${kickerColor}`}>
        ⌁ {kicker}
      </p>
      <h2 className={`font-display mt-3 text-4xl md:text-5xl ${titleColor}`}>
        {title}
      </h2>
      {blurb && <p className={`mt-3 text-lg leading-relaxed ${blurbColor}`}>{blurb}</p>}
    </div>
  );
}
