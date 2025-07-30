import { render, screen, fireEvent } from "@testing-library/react";
import LogoutConfirmDialog from "../LogoutConfirmDialog";
import { vi } from "vitest";

describe("LogoutConfirmDialog", () => {
  const setup = (open = true) => {
    const onClose = vi.fn();
    const onConfirm = vi.fn();

    render(
      <LogoutConfirmDialog
        open={open}
        onClose={onClose}
        onConfirm={onConfirm}
      />,
    );

    return { onClose, onConfirm };
  };

  it("renders when open is true", () => {
    setup(true);
    expect(screen.getByText("Confirm Logout")).toBeInTheDocument();
    expect(
      screen.getByText("Are you sure you want to log out?"),
    ).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  it("does not render when open is false", () => {
    setup(false);
    expect(screen.queryByText("Confirm Logout")).not.toBeInTheDocument();
  });

  it("calls onClose when Cancel is clicked", () => {
    const { onClose } = setup(true);
    fireEvent.click(screen.getByText("Cancel"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose and onConfirm when Logout is clicked", () => {
    const { onClose, onConfirm } = setup(true);
    fireEvent.click(screen.getByText("Logout"));
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });
});
