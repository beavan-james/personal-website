import "./globals.css";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";
import SiteBackdrop from "../components/SiteBackdrop";

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
      className="h-full scroll-smooth"
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
        <div className="site-grain" aria-hidden="true" />
      </body>
    </html>
  );
}
