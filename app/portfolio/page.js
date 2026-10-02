import Projects from "../../components/Projects";

export const metadata = {
  title: "Portfolio | James Beavan",
  description: "Pipelines, APIs, and ranking models by James Beavan.",
};

export default function PortfolioPage() {
  return (
    <main className="flex-1 bg-ink/80">
      <Projects />
    </main>
  );
}
