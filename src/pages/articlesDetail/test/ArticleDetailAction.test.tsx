import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ArticleDetailAction from "../ArticleDetailAction";
import { describe, it, expect, vi, beforeEach } from "vitest";

const mockClipboard = {
  writeText: vi.fn(),
};

Object.defineProperty(navigator, "clipboard", {
  value: mockClipboard,
});

describe("ArticleDetailAction", () => {
  const mockSave = vi.fn();
  const title = "Test Article Title";

  beforeEach(() => {
    mockClipboard.writeText.mockReset();
    mockSave.mockReset();
  });

  it("renders Share and Save buttons", () => {
    render(
      <ArticleDetailAction
        isSaved={false}
        onSave={mockSave}
        articleTitle={title}
      />,
    );

    expect(screen.getByTestId("share-button")).toBeInTheDocument();
    expect(screen.getByTestId("save-button")).toBeInTheDocument();
    expect(screen.getByText("Save")).toBeInTheDocument();
  });

  it("renders Saved state if isSaved is true", () => {
    render(
      <ArticleDetailAction
        isSaved={true}
        onSave={mockSave}
        articleTitle={title}
      />,
    );

    expect(screen.getByText("Saved")).toBeInTheDocument();
  });

  it("calls onSave when Save button is clicked", () => {
    render(
      <ArticleDetailAction
        isSaved={false}
        onSave={mockSave}
        articleTitle={title}
      />,
    );

    fireEvent.click(screen.getByTestId("save-button"));
    expect(mockSave).toHaveBeenCalled();
  });

  it("opens share menu on Share button click", () => {
    render(
      <ArticleDetailAction
        isSaved={false}
        onSave={mockSave}
        articleTitle={title}
      />,
    );

    fireEvent.click(screen.getByTestId("share-button"));
    expect(screen.getByText("Copy Link")).toBeInTheDocument();
    expect(screen.getByText("WhatsApp")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
  });

  it("copies link to clipboard and shows snackbar", async () => {
    render(
      <ArticleDetailAction
        isSaved={false}
        onSave={mockSave}
        articleTitle={title}
      />,
    );

    fireEvent.click(screen.getByTestId("share-button"));
    fireEvent.click(screen.getByText("Copy Link"));

    await waitFor(() => {
      expect(mockClipboard.writeText).toHaveBeenCalledWith(
        window.location.href,
      );
      expect(screen.getByText("Link copied to clipboard!")).toBeInTheDocument();
    });
  });
});
