export default function SectionHeading({ kicker, title, blurb }) {
  return (
    <div className="reveal mb-8 max-w-2xl">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-dim">
        {kicker}
      </p>
      <h2 className="font-display mt-3 text-2xl leading-snug text-paper text-balance md:text-3xl">
        {title}
      </h2>
      {blurb && (
        <p className="mt-3 max-w-xl text-base leading-relaxed text-silver">
          {blurb}
        </p>
      )}
    </div>
  );
}
