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
  title: "Alex Carter — CS Student Portfolio",
  description:
    "Personal website of a computer science student. Projects, experience, and blog — with a subtle climbing-inspired theme.",
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
