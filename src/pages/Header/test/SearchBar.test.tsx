import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "../SearchBar";
import { vi } from "vitest";

describe("SearchBar", () => {
  const setup = () => {
    const onQueryChange = vi.fn();
    const onSearch = vi.fn();

    render(
      <SearchBar
        query="initial query"
        onQueryChange={onQueryChange}
        onSearch={onSearch}
      />,
    );

    const input = screen.getByPlaceholderText("Search") as HTMLInputElement;
    const button = screen.getByRole("button");

    return { input, button, onQueryChange, onSearch };
  };

  it("renders input with initial query", () => {
    const { input } = setup();
    expect(input.value).toBe("initial query");
  });

  it("calls onQueryChange when user types", () => {
    const { input, onQueryChange } = setup();
    fireEvent.change(input, { target: { value: "new value" } });
    expect(onQueryChange).toHaveBeenCalledWith("new value");
  });

  it("calls onSearch when button is clicked", () => {
    const { button, onSearch } = setup();
    fireEvent.click(button);
    expect(onSearch).toHaveBeenCalled();
  });

  it("calls onSearch when Enter key is pressed", () => {
    const { input, onSearch } = setup();
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
    expect(onSearch).toHaveBeenCalled();
  });
});
