import { Fraunces, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";
import SiteBackdrop from "../components/SiteBackdrop";

// Fraunces for the name and headings; the IBM Plex superfamily for the
// rest: Plex Sans for body copy, Plex Mono for labels and metadata.
const sans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const display = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT"],
});

export const metadata = {
  // Absolute base for the generated og:image / twitter:image URLs
  metadataBase: new URL("https://portfolio.stockidence.com"),
  title: "James Beavan | Data Engineering",
  description:
    "Georgia Tech Math junior building data pipelines and ranking models.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable} ${display.variable} h-full scroll-smooth`}
    >
      <body
        className={`min-h-full flex flex-col bg-ink text-paper antialiased`}
      >
        <SiteBackdrop />
        <Nav />
        <div className="flex flex-1 flex-col">
          <Reveal />
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
