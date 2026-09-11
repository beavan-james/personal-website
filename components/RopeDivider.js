export default function RopeDivider() {
  return (
    <div aria-hidden className="mx-auto max-w-6xl px-5">
      <div className="flex items-center gap-3 opacity-70">
        <span className="h-px flex-1 bg-mist/25" />
        <span className="grid h-8 w-8 place-items-center rounded-full border border-rose/60 text-rose">
          ⬡
        </span>
        <span className="h-px flex-1 bg-mist/25 [background-image:repeating-linear-gradient(90deg,#ce7b91_0_8px,transparent_8px_14px)]" />
        <span className="h-px flex-1 bg-mist/25" />
      </div>
    </div>
  );
}
