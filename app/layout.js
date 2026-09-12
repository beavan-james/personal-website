import { Ubuntu, Ubuntu_Mono } from "next/font/google";
import "./globals.css";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";

const body = Ubuntu({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const mono = Ubuntu_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const display = Ubuntu({
  variable: "--font-ubuntu",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata = {
  title: "James Beavan | Data Engineering",
  description:
    "Georgia Tech Math junior building data pipelines and ranking models.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body
        className={`${body.variable} ${mono.variable} ${display.variable} min-h-full flex flex-col bg-ink text-paper antialiased`}
      >
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
