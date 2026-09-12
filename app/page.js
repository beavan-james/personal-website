import Hero from "../components/Hero";
import About from "../components/About";
import Projects from "../components/Projects";
import Timeline from "../components/Timeline";
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
      <Contact />
    </main>
  );
}
