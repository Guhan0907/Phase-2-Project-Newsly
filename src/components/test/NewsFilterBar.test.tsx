import { render, screen, fireEvent } from "@testing-library/react";
import NewsFilterBar from "../NewsFilterBar";
import { vi } from "vitest";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const renderWithTheme = (ui: React.ReactElement) => {
  const theme = createTheme();
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
};

describe("NewsFilterBar", () => {
  const mockOnStoryTypeChange = vi.fn();
  const mockOnFiltersChange = vi.fn();

  const baseProps = {
    storyType: "top",
    onStoryTypeChange: mockOnStoryTypeChange,
    filters: {
      section: "",
      category: "",
      date: "",
      year: "",
      month: "",
    },
    onFiltersChange: mockOnFiltersChange,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it.skip("renders story type selector", () => {
    renderWithTheme(<NewsFilterBar {...baseProps} />);
    expect(screen.getByLabelText(/Story Type/i)).toBeInTheDocument();
  });

  it.skip("calls onStoryTypeChange when story type is changed", () => {
    renderWithTheme(<NewsFilterBar {...baseProps} />);
    fireEvent.mouseDown(screen.getByLabelText(/Story Type/i));
    fireEvent.click(screen.getByText("Trending"));

    expect(mockOnStoryTypeChange).toHaveBeenCalledWith("trending");
  });

  it.skip("shows 'section' filter when storyType is 'top'", () => {
    renderWithTheme(<NewsFilterBar {...baseProps} />);
    expect(screen.getByLabelText(/Section/i)).toBeInTheDocument();
  });

  it.skip("calls onFiltersChange when section is changed", () => {
    renderWithTheme(<NewsFilterBar {...baseProps} />);
    fireEvent.mouseDown(screen.getByLabelText(/Section/i));
    fireEvent.click(screen.getByText("Health"));

    expect(mockOnFiltersChange).toHaveBeenCalledWith(
      expect.objectContaining({ section: "health" }),
    );
  });

  it("shows year and month inputs when storyType is 'archived'", () => {
    renderWithTheme(
      <NewsFilterBar
        {...baseProps}
        storyType="archived"
        filters={{ year: "2023", month: "5" }}
      />,
    );

    expect(screen.getByLabelText("Year")).toBeInTheDocument();
    expect(screen.getByLabelText("Month")).toBeInTheDocument();
  });

  it.skip("calls onFiltersChange when year or month is changed", () => {
    renderWithTheme(
      <NewsFilterBar
        {...baseProps}
        storyType="archived"
        filters={{ year: "", month: "" }}
      />,
    );

    fireEvent.change(screen.getByLabelText("Year"), {
      target: { value: "2022" },
    });
    fireEvent.change(screen.getByLabelText("Month"), {
      target: { value: "7" },
    });

    expect(mockOnFiltersChange).toHaveBeenCalledWith(
      expect.objectContaining({ year: "2022" }),
    );
    expect(mockOnFiltersChange).toHaveBeenCalledWith(
      expect.objectContaining({ month: "7" }),
    );
  });
});

// so here we have written many skipped so we have to change that and we need to make some changes according to that
