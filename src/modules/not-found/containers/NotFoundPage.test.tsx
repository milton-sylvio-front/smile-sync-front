import { fireEvent, render, screen } from "@testing-library/react";
import { NotFoundPage } from "@/modules/not-found/containers/NotFoundPage";
import { notFoundContent } from "@/mocks/not-found";

describe("NotFoundPage", () => {
  it("mostra a página não encontrada com os textos do mock", () => {
    render(<NotFoundPage content={notFoundContent} />);

    expect(
      screen.getByRole("heading", { level: 1, name: notFoundContent.title }),
    ).toBeInTheDocument();
    expect(screen.getByText(notFoundContent.description)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: notFoundContent.home.label }),
    ).toHaveAttribute("href", notFoundContent.home.href);
    expect(
      screen.getByRole("button", { name: notFoundContent.back.label }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: notFoundContent.support.label }),
    ).toHaveAttribute("href", notFoundContent.support.href);
    expect(
      screen.getByRole("link", { name: notFoundContent.report.label }),
    ).toHaveAttribute("href", notFoundContent.report.href);
  });

  it("volta para a página anterior", () => {
    const back = jest.spyOn(window.history, "back").mockImplementation(() => undefined);
    render(<NotFoundPage content={notFoundContent} />);

    fireEvent.click(screen.getByRole("button", { name: notFoundContent.back.label }));

    expect(back).toHaveBeenCalledTimes(1);
    back.mockRestore();
  });
});
