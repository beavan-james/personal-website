import Hero from "../components/Hero";
import About from "../components/About";
import Projects from "../components/Projects";
import Timeline from "../components/Timeline";
import BlogPreview from "../components/BlogPreview";
import Contact from "../components/Contact";
import RopeDivider from "../components/RopeDivider";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <RopeDivider />
      <Projects />
      <Timeline />
      <BlogPreview />
      <Contact />
    </main>
  );
}
