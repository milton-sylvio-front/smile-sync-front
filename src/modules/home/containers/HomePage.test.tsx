import { render, screen } from "@testing-library/react";
import { HomePage } from "@/components/home/HomePage";
import { homeContent } from "@/mocks/home";

describe("HomePage", () => {
  it("renderiza o conteúdo principal a partir do mock", () => {
    render(<HomePage content={homeContent} />);

    expect(
      screen.getByRole("heading", { level: 1, name: homeContent.hero.title }),
    ).toBeInTheDocument();
    expect(screen.getByText(homeContent.hero.trustLabel)).toBeInTheDocument();

    for (const feature of homeContent.features.items) {
      expect(screen.getByRole("heading", { name: feature.title })).toBeInTheDocument();
    }

    for (const stat of homeContent.solutions.stats) {
      expect(screen.getByText(stat.value)).toBeInTheDocument();
      expect(screen.getByText(stat.label)).toBeInTheDocument();
    }

    expect(screen.getByText(homeContent.pricing.note)).toBeInTheDocument();
    expect(screen.getByText(homeContent.footer.copyright)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: homeContent.footer.phone.label })).toHaveAttribute(
      "href",
      homeContent.footer.phone.href,
    );
  });
});
