import AlbumShelf from "../../components/AlbumShelf";
import Doodle from "../../components/Doodle";
import ReadingList from "../../components/ReadingList";
import { fieldNotes } from "../../lib/site";

export const metadata = {
  title: "Field Notes | James Beavan",
  description: "What James Beavan has been listening to, reading, climbing, and cooking.",
};

function Label({ icon, children }) {
  return (
    <h2 className="reveal flex items-center gap-3 font-display font-soft text-3xl leading-tight text-paper md:text-4xl">
      <span className="text-accent-dim">
        <Doodle name={icon} className="h-7 w-7 md:h-8 md:w-8" />
      </span>
      {children}
    </h2>
  );
}

export default function FieldNotesPage() {
  return (
    <main className="flex-1 bg-ink/80 py-16">
      <header className="mx-auto max-w-5xl px-5">
        <p className="hero-stage hero-stage-1 font-mono text-xs uppercase tracking-widest text-accent">
          Off the clock
        </p>
        <h1 className="hero-stage hero-stage-1 font-display font-soft mt-3 text-5xl leading-none text-paper md:text-7xl">
          Field Notes
        </h1>
        <p className="hero-stage hero-stage-2 mt-5 max-w-xl leading-relaxed text-silver">
          {fieldNotes.intro}
        </p>
      </header>

      <section className="mt-20">
        <div className="mx-auto mb-6 max-w-5xl px-5">
          <Label icon="record">On rotation</Label>
        </div>
        <div className="space-y-12">
          {fieldNotes.listening.map(({ month, albums }) => (
            <AlbumShelf key={month} month={month} albums={albums} />
          ))}
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-5xl px-5">
        <div className="mb-8">
          <Label icon="book">Notes &amp; takeaways</Label>
        </div>
        <ReadingList />
      </section>

      <section className="mx-auto mt-20 max-w-5xl px-5">
        <h2 className="reveal font-display font-soft text-3xl leading-tight text-paper md:text-4xl">
          Elsewhere
        </h2>
        <div className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {fieldNotes.elsewhere.map(({ label, icon, lines }) => (
            <div key={label} className="reveal border-t border-line pt-5">
              <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent-dim">
                <Doodle name={icon} className="h-4 w-4" />
                {label}
              </p>
              <ul className="mt-3 space-y-1.5 text-silver">
                {lines.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
