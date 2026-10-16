import DragScroll from "./DragScroll";

// One month of albums as a horizontally scrolling (and mouse-draggable)
// shelf. Each sleeve opens its tracklist in a native popover
// (popovertarget): light dismiss, Esc to close, and focus return come from
// the browser.

// Placeholder sleeves for albums without a `cover`, cycled through the palette
const blankSleeves = [
  "bg-coal text-paper",
  "bg-accent-dim text-ink",
  "bg-line text-paper",
  "bg-paper text-ink",
];

const toId = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

function Cover({ album, index, className, titleClass = "text-2xl" }) {
  if (album.cover) {
    return (
      // Static export: no image optimizer, so a plain <img> is the right tool
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={album.cover}
        alt=""
        width={600}
        height={600}
        loading="lazy"
        className={`aspect-square object-cover ${className}`}
      />
    );
  }
  return (
    <span
      className={`flex aspect-square flex-col justify-between p-4 text-left ${blankSleeves[index % blankSleeves.length]} ${className}`}
    >
      <span className={`font-display font-soft leading-none ${titleClass}`}>{album.title}</span>
      <span className="font-mono text-[10px] uppercase tracking-widest opacity-70">{album.artist}</span>
    </span>
  );
}

export default function AlbumShelf({ month, albums }) {
  const monthId = toId(month);

  return (
    <div className="reveal">
      <p className="mx-auto max-w-5xl px-5 font-mono text-xs uppercase tracking-widest text-muted">
        {month} <span className="text-line">/</span> {albums.length} albums
      </p>

      <DragScroll
        className="shelf mt-4 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-6 pt-4"
        aria-label={`Albums for ${month}`}
      >
        {albums.map((album, i) => (
          <li key={album.title + album.artist} className="w-40 shrink-0 snap-start sm:w-48">
            <button
              type="button"
              popoverTarget={`album-${monthId}-${i}`}
              className="sleeve-button block w-full text-left"
            >
              <Cover album={album} index={i} className="sleeve-art block w-full shadow-lg shadow-black/40" />
              <span className="sleeve-title mt-2 block truncate text-sm text-paper">{album.title}</span>
              <span className="block truncate font-mono text-[11px] uppercase tracking-widest text-muted">
                {album.artist}
              </span>
            </button>
          </li>
        ))}
      </DragScroll>

      {albums.map((album, i) => (
        <div
          key={album.title + album.artist}
          id={`album-${monthId}-${i}`}
          popover="auto"
          aria-label={`${album.title} by ${album.artist}`}
          className="album-pop m-auto max-h-[85svh] w-[min(36rem,calc(100vw-2rem))] overflow-y-auto border border-line bg-coal p-0 text-paper backdrop:bg-ink/70 backdrop:backdrop-blur-sm"
        >
          <div className="flex items-start gap-5 border-b border-line p-5">
            <Cover album={album} index={i} titleClass="text-base" className="w-24 shrink-0 sm:w-32" />
            <div className="min-w-0 flex-1">
              {album.year && (
                <p className="font-mono text-[11px] uppercase tracking-widest text-accent-dim">
                  {album.year}
                </p>
              )}
              <h3 className="font-display font-soft mt-1 text-2xl leading-tight text-paper sm:text-3xl">
                {album.title}
              </h3>
              <p className="mt-1 text-sm text-silver">{album.artist}</p>
              {album.link && (
                <a
                  href={album.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link mt-3 inline-block text-sm text-silver"
                >
                  Listen <span className="link-arrow link-arrow-out">↗︎</span>
                </a>
              )}
            </div>
            <button
              type="button"
              popoverTarget={`album-${monthId}-${i}`}
              popoverTargetAction="hide"
              aria-label="Close tracklist"
              className="grid h-7 w-7 shrink-0 cursor-pointer place-items-center border border-line text-sm text-silver transition-colors hover:border-accent hover:text-accent"
            >
              ×
            </button>
          </div>
          {!album.tracks?.length && (
            <p className="px-5 py-6 text-sm text-muted">Tracklist coming soon.</p>
          )}
          <ol className="divide-y divide-line px-5 py-2">
            {album.tracks?.map((track, t) => (
              <li key={`${t}-${track}`} className="flex gap-4 py-2.5 text-sm text-silver">
                <span className="w-6 shrink-0 font-mono text-xs leading-5 text-muted">
                  {String(t + 1).padStart(2, "0")}
                </span>
                {track}
              </li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
}
