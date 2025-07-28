import { render, screen, fireEvent } from "@testing-library/react";
import UserMenu from "../UserMenu";
import { vi } from "vitest";

describe("UserMenu", () => {
  const mockUser = {
    name: "John Doe",
    imageUrl: "https://example.com/avatar.jpg",
  };

  it("does not render when user is null", () => {
    const { container } = render(<UserMenu user={null} onLogout={() => {}} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders avatar when user is provided", () => {
    render(<UserMenu user={mockUser} onLogout={() => {}} />);
    expect(screen.getByRole("img")).toHaveAttribute("src", mockUser.imageUrl);
    expect(screen.getByRole("img")).toHaveAttribute("alt", mockUser.name);
  });

  it("opens the menu when avatar is clicked", () => {
    render(<UserMenu user={mockUser} onLogout={() => {}} />);
    const avatarButton = screen.getByRole("button");
    fireEvent.click(avatarButton);
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  it("calls onLogout when Logout menu item is clicked", () => {
    const handleLogout = vi.fn();
    render(<UserMenu user={mockUser} onLogout={handleLogout} />);
    fireEvent.click(screen.getByRole("button")); // Open menu
    fireEvent.click(screen.getByText("Logout")); // Click Logout
    expect(handleLogout).toHaveBeenCalledTimes(1);
  });
});
