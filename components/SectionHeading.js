export default function SectionHeading({ title, blurb }) {
  return (
    <div className="reveal mb-10 max-w-2xl">
      <h2 className="font-display text-3xl leading-tight text-paper text-balance md:text-4xl">
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
