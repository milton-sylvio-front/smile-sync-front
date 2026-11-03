import { fireEvent, render, screen } from "@testing-library/react";
import { Header } from "@/modules/home/components/Header";
import { homeContent } from "@/mocks/home";

function renderHeader() {
  return render(
    <Header
      brandName={homeContent.brand.name}
      navigation={homeContent.navigation}
      login={homeContent.login}
      trial={homeContent.trial}
    />,
  );
}

describe("Header", () => {
  it("lista os itens de menu vindos do mock", () => {
    renderHeader();

    for (const item of homeContent.navigation) {
      expect(screen.getAllByRole("link", { name: item.label }).length).toBeGreaterThan(0);
    }

    expect(screen.getAllByRole("link", { name: homeContent.login.label }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: homeContent.trial.label }).length).toBeGreaterThan(0);
  });

  it("abre e fecha o menu móvel", () => {
    renderHeader();

    expect(screen.queryByRole("navigation", { name: "Menu móvel" })).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Abrir menu" }));

    expect(screen.getByRole("navigation", { name: "Menu móvel" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Fechar menu" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );

    fireEvent.click(screen.getByRole("button", { name: "Fechar menu" }));

    expect(screen.queryByRole("navigation", { name: "Menu móvel" })).not.toBeInTheDocument();
  });
});
