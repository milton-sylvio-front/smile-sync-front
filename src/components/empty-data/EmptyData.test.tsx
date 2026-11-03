import { fireEvent, render, screen } from "@testing-library/react";
import { EmptyData } from "@/components/empty-data/EmptyData";
import { emptyDataContent } from "@/mocks/empty-data";

describe("EmptyData", () => {
  it("mostra o estado vazio com os textos do mock", () => {
    render(<EmptyData content={emptyDataContent} />);

    expect(
      screen.getByRole("heading", { level: 2, name: emptyDataContent.title }),
    ).toBeInTheDocument();
    expect(screen.getByText(emptyDataContent.description)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: emptyDataContent.clearFiltersLabel }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: emptyDataContent.addRecord.label }),
    ).toHaveAttribute("href", emptyDataContent.addRecord.href);
    expect(screen.getByText(emptyDataContent.tip)).toBeInTheDocument();
  });

  it("limpa os filtros ao acionar o botão", () => {
    const onClearFilters = jest.fn();
    render(
      <EmptyData content={emptyDataContent} onClearFilters={onClearFilters} />,
    );

    fireEvent.click(
      screen.getByRole("button", { name: emptyDataContent.clearFiltersLabel }),
    );

    expect(onClearFilters).toHaveBeenCalledTimes(1);
  });
});
