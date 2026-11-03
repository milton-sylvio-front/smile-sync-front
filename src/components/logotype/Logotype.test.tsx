import { render, screen } from "@testing-library/react";
import { Logotype } from "@/components/logotype/Logotype";

describe("Logotype", () => {
  it("mostra o nome da marca como link para a home", () => {
    render(<Logotype name="SmileSync" />);

    const brand = screen.getByRole("link", { name: "SmileSync" });

    expect(brand).toBeInTheDocument();
    expect(brand).toHaveAttribute("href", "/");
  });

  it("aplica o tom claro para fundos escuros", () => {
    render(<Logotype name="SmileSync" tone="inverse" />);

    expect(screen.getByText("SmileSync")).toHaveClass("text-white");
  });
});
