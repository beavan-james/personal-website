import SectionHeading from "./SectionHeading";
import { site } from "../lib/site";

export default function Contact() {
  return (
    <section id="contact" className="topo-bg grain relative bg-evergreen-deep py-20">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          kicker="Contact"
          title="Let's connect"
          blurb="Internships, collaborations, or side-project ideas — my inbox is open. (If you climb too, even better.)"
        />
        <div className="grid gap-6 md:grid-cols-[0.9fr_1.1fr]">
          <div className="reveal rounded-3xl border border-mist/15 bg-evergreen p-7">
            <p className="font-mono text-xs uppercase tracking-widest text-sky">
              Contact
            </p>
            <a
              href={`mailto:${site.email}`}
              className="font-display mt-3 block text-xl leading-[1.3] break-all text-cream hover:text-rose"
            >
              {site.email}
            </a>
            <div className="mt-6 space-y-2">
              {site.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="flex items-center justify-between rounded-2xl bg-mist/10 px-4 py-3 text-sky hover:bg-mist/20"
                >
                  {s.label} <span>↗</span>
                </a>
              ))}
            </div>
          </div>
          <form
            className="reveal rounded-3xl bg-cream p-7 text-evergreen"
            action={`mailto:${site.email}`}
            method="post"
            encType="text/plain"
          >
            <label className="block text-sm font-semibold">
              Name
              <input
                required
                name="name"
                placeholder="Your name"
                className="mt-2 w-full rounded-2xl border border-taupe/30 bg-white px-4 py-3 outline-none placeholder:text-taupe/60 focus:border-rose"
              />
            </label>
            <label className="mt-4 block text-sm font-semibold">
              Email
              <input
                required
                type="email"
                name="email"
                placeholder="you@school.edu"
                className="mt-2 w-full rounded-2xl border border-taupe/30 bg-white px-4 py-3 outline-none placeholder:text-taupe/60 focus:border-rose"
              />
            </label>
            <label className="mt-4 block text-sm font-semibold">
              Message
              <textarea
                required
                name="message"
                rows={4}
                placeholder="What would you like to talk about?"
                className="mt-2 w-full rounded-2xl border border-taupe/30 bg-white px-4 py-3 outline-none placeholder:text-taupe/60 focus:border-rose"
              />
            </label>
            <button
              type="submit"
              className="hold-hover mt-5 w-full rounded-full bg-rose py-3 font-semibold text-evergreen"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
