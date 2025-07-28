import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import FeaturedNewsCardShimmer from "../FeaturedNewsCardShimmer";

vi.mock("@mui/material", async () => {
  const actual = await vi.importActual("@mui/material");
  return {
    ...actual,
    useMediaQuery: vi.fn(),
  };
});

const testTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

const ThemeWrapper = ({ children }) => (
  <ThemeProvider theme={testTheme}>{children}</ThemeProvider>
);

describe("FeaturedNewsCardShimmer", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("Component Rendering", () => {
    it("should render the shimmer card with all required elements", () => {
      useMediaQuery.mockReturnValue(true);

      render(
        <ThemeWrapper>
          <FeaturedNewsCardShimmer />
        </ThemeWrapper>,
      );

      expect(screen.getByTestId("featured-shimmer-card")).toBeInTheDocument();

      expect(screen.getByTestId("skeleton-featured-image")).toBeInTheDocument();

      expect(screen.getByTestId("skeleton-featured-title")).toBeInTheDocument();

      expect(
        screen.getByTestId("skeleton-featured-desc-1"),
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("skeleton-featured-desc-2"),
      ).toBeInTheDocument();
    });

    it("should render with correct card structure", () => {
      useMediaQuery.mockReturnValue(false);

      render(
        <ThemeWrapper>
          <FeaturedNewsCardShimmer />
        </ThemeWrapper>,
      );

      const card = screen.getByTestId("featured-shimmer-card");
      expect(card).toHaveStyle({
        display: "flex",
        "flex-direction": "column",
        height: "100%",
      });
    });
  });

  describe("Responsive Behavior", () => {
    it("should display mobile layout when screen is small", () => {
      useMediaQuery.mockReturnValue(true);

      render(
        <ThemeWrapper>
          <FeaturedNewsCardShimmer />
        </ThemeWrapper>,
      );

      const imagesSkeleton = screen.getByTestId("skeleton-featured-image");
      const titleSkeleton = screen.getByTestId("skeleton-featured-title");

      expect(imagesSkeleton).toHaveStyle("height: 200px");
      expect(titleSkeleton).toHaveStyle("height: 32px");
    });

    it("should display desktop layout when screen is large", () => {
      useMediaQuery.mockReturnValue(false);

      render(
        <ThemeWrapper>
          <FeaturedNewsCardShimmer />
        </ThemeWrapper>,
      );

      const imagesSkeleton = screen.getByTestId("skeleton-featured-image");
      const titleSkeleton = screen.getByTestId("skeleton-featured-title");

      expect(imagesSkeleton).toHaveStyle("height: 350px");
      expect(titleSkeleton).toHaveStyle("height: 40px");
    });

    it("should call useMediaQuery with correct breakpoint", () => {
      render(
        <ThemeWrapper>
          <FeaturedNewsCardShimmer />
        </ThemeWrapper>,
      );

      expect(useMediaQuery).toHaveBeenCalledWith(
        testTheme.breakpoints.down("sm"),
      );
    });
  });

  describe("Skeleton Properties", () => {
    beforeEach(() => {
      useMediaQuery.mockReturnValue(false);
    });

    it("should render image skeleton with correct properties", () => {
      render(
        <ThemeWrapper>
          <FeaturedNewsCardShimmer />
        </ThemeWrapper>,
      );

      const imageSkeleton = screen.getByTestId("skeleton-featured-image");

      expect(imageSkeleton).toHaveClass("MuiSkeleton-rectangular");
      expect(imageSkeleton).toHaveClass("MuiSkeleton-wave");
      expect(imageSkeleton).toHaveStyle("height: 350px");
    });

    it("should render title skeleton with correct properties", () => {
      render(
        <ThemeWrapper>
          <FeaturedNewsCardShimmer />
        </ThemeWrapper>,
      );

      const titleSkeleton = screen.getByTestId("skeleton-featured-title");

      expect(titleSkeleton).toHaveClass("MuiSkeleton-text");
      expect(titleSkeleton).toHaveClass("MuiSkeleton-wave");
      expect(titleSkeleton).toHaveStyle("height: 40px");
      expect(titleSkeleton).toHaveStyle("width: 80%");
    });

    it("should render first description skeleton with correct properties", () => {
      render(
        <ThemeWrapper>
          <FeaturedNewsCardShimmer />
        </ThemeWrapper>,
      );

      const descSkeleton1 = screen.getByTestId("skeleton-featured-desc-1");

      expect(descSkeleton1).toHaveClass("MuiSkeleton-text");
      expect(descSkeleton1).toHaveClass("MuiSkeleton-wave");
      expect(descSkeleton1).toHaveStyle("height: 20px");
      expect(descSkeleton1).toHaveStyle("width: 95%");
    });

    it("should render second description skeleton with correct properties", () => {
      render(
        <ThemeWrapper>
          <FeaturedNewsCardShimmer />
        </ThemeWrapper>,
      );

      const descSkeleton2 = screen.getByTestId("skeleton-featured-desc-2");

      expect(descSkeleton2).toHaveClass("MuiSkeleton-text");
      expect(descSkeleton2).toHaveClass("MuiSkeleton-wave");
      expect(descSkeleton2).toHaveStyle("height: 20px");
      expect(descSkeleton2).toHaveStyle("width: 90%");
    });
  });

  describe("Theme Integration", () => {
    it("should work without theme provider (fallback)", () => {
      useMediaQuery.mockReturnValue(false);

      expect(() => {
        render(<FeaturedNewsCardShimmer />);
      }).not.toThrow();

      expect(screen.getByTestId("featured-shimmer-card")).toBeInTheDocument();
    });

    it("should handle theme changes correctly", () => {
      useMediaQuery.mockReturnValue(true);

      const { rerender } = render(
        <ThemeWrapper>
          <FeaturedNewsCardShimmer />
        </ThemeWrapper>,
      );

      expect(screen.getByTestId("skeleton-featured-image")).toHaveStyle(
        "height: 200px",
      );

      useMediaQuery.mockReturnValue(false);
      rerender(
        <ThemeWrapper>
          <FeaturedNewsCardShimmer />
        </ThemeWrapper>,
      );

      expect(screen.getByTestId("skeleton-featured-image")).toHaveStyle(
        "height: 350px",
      );
    });
  });

  describe("Accessibility", () => {
    it("should have proper test ids for testing", () => {
      useMediaQuery.mockReturnValue(false);

      render(
        <ThemeWrapper>
          <FeaturedNewsCardShimmer />
        </ThemeWrapper>,
      );

      expect(screen.getByTestId("featured-shimmer-card")).toBeInTheDocument();
      expect(screen.getByTestId("skeleton-featured-image")).toBeInTheDocument();
      expect(screen.getByTestId("skeleton-featured-title")).toBeInTheDocument();
      expect(
        screen.getByTestId("skeleton-featured-desc-1"),
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("skeleton-featured-desc-2"),
      ).toBeInTheDocument();
    });

    it("should render semantic HTML structure", () => {
      useMediaQuery.mockReturnValue(false);

      render(
        <ThemeWrapper>
          <FeaturedNewsCardShimmer />
        </ThemeWrapper>,
      );

      const card = screen.getByTestId("featured-shimmer-card");
      expect(card.tagName.toLowerCase()).toBe("div");

      const cardContent = card.querySelector('[class*="MuiCardContent"]');
      expect(cardContent).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("should handle undefined theme gracefully", () => {
      useMediaQuery.mockReturnValue(false);

      expect(() => {
        render(<FeaturedNewsCardShimmer />);
      }).not.toThrow();
    });

    it("should maintain consistent rendering across multiple renders", () => {
      useMediaQuery.mockReturnValue(true);

      const { rerender } = render(
        <ThemeWrapper>
          <FeaturedNewsCardShimmer />
        </ThemeWrapper>,
      );

      const initialCard = screen.getByTestId("featured-shimmer-card");

      rerender(
        <ThemeWrapper>
          <FeaturedNewsCardShimmer />
        </ThemeWrapper>,
      );

      const rerenderedCard = screen.getByTestId("featured-shimmer-card");

      expect(initialCard.tagName).toBe(rerenderedCard.tagName);
    });

    it("should handle rapid breakpoint changes", () => {
      const { rerender } = render(
        <ThemeWrapper>
          <FeaturedNewsCardShimmer />
        </ThemeWrapper>,
      );

      useMediaQuery.mockReturnValue(true);
      rerender(
        <ThemeWrapper>
          <FeaturedNewsCardShimmer />
        </ThemeWrapper>,
      );

      useMediaQuery.mockReturnValue(false);
      rerender(
        <ThemeWrapper>
          <FeaturedNewsCardShimmer />
        </ThemeWrapper>,
      );

      useMediaQuery.mockReturnValue(true);
      rerender(
        <ThemeWrapper>
          <FeaturedNewsCardShimmer />
        </ThemeWrapper>,
      );

      expect(screen.getByTestId("featured-shimmer-card")).toBeInTheDocument();
      expect(screen.getByTestId("skeleton-featured-image")).toHaveStyle(
        "height: 200px",
      );
    });
  });
});
