import { render, screen, fireEvent } from "@testing-library/react";
import AllItemsCard from "../AllItemCard";
import type { NYTArticle } from "../../types/article";
import { vi } from "vitest";

const mockArticle: NYTArticle = {
  title: "Test Article Title",
  abstract: "Test article abstract content.",
  byline: "By John Doe",
  published_date: new Date("2024-07-01").toISOString(),
  url: "https://example.com/test-article",
  multimedia: [
    {
      url: "https://example.com/image.jpg",
      format: "Standard Thumbnail",
      height: 75,
      width: 75,
      type: "image",
      subtype: "photo",
      caption: "Example image",
    },
  ],
  des_facet: ["News"],
  isRead: false,
};

describe("AllItemsCard", () => {
  it("renders article title, abstract and metadata", () => {
    render(<AllItemsCard article={mockArticle} />);
    expect(screen.getByText("Test Article Title")).toBeInTheDocument();
    expect(
      screen.getByText("Test article abstract content."),
    ).toBeInTheDocument();
    expect(screen.getByText("By John Doe")).toBeInTheDocument();
    expect(screen.getByText("7/1/2024")).toBeInTheDocument(); 
  });

  it("renders article image", () => {
    render(<AllItemsCard article={mockArticle} />);
    const image = screen.getByRole("img") as HTMLImageElement;
    expect(image).toBeInTheDocument();
    expect(image.src).toBe("https://example.com/image.jpg");
  });

  it("does not render abstract if showAbstract is false", () => {
    render(<AllItemsCard article={mockArticle} showAbstract={false} />);
    expect(
      screen.queryByText("Test article abstract content."),
    ).not.toBeInTheDocument();
  });

  it("does not render metadata if showMetadata is false", () => {
    render(<AllItemsCard article={mockArticle} showMetadata={false} />);
    expect(screen.queryByText("By John Doe")).not.toBeInTheDocument();
    expect(screen.queryByText("7/1/2024")).not.toBeInTheDocument();
  });

  it("calls onClick when the card is clicked", () => {
    const onClickMock = vi.fn();
    render(<AllItemsCard article={mockArticle} onClick={onClickMock} />);
    fireEvent.click(screen.getByText("Test Article Title"));
    expect(onClickMock).toHaveBeenCalled();
  });

  it("renders favorite button and triggers onFavoriteClick when clicked", () => {
    const onFavClick = vi.fn();
    console.log("t------",vi.fn())
    render(
      <AllItemsCard
        article={mockArticle}
        showFavoriteButton={true}
        onFavoriteClick={onFavClick}
      />,
    );

    const favBtn = screen.getByTestId("favorite-button");
    fireEvent.click(favBtn);
    expect(onFavClick).toHaveBeenCalledWith("https://example.com/test-article");
  });
});
