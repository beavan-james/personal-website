import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import ScrollProgress from "../components/ScrollProgress";
import Reveal from "../components/Reveal";

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "James Beavan | Data Engineering Portfolio",
  description:
    "Georgia Tech Mathematics / Data Science student specializing in data engineering, pipelines, and ranking models.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body
        className={`${body.variable} ${mono.variable} min-h-full flex flex-col bg-evergreen text-cream antialiased`}
      >
        <ScrollProgress />
        <Nav />
        <div className="flex-1">
          <Reveal />
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
