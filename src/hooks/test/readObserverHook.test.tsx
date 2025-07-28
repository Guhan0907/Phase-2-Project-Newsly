import { render, screen } from "@testing-library/react";
import { useReadObserver } from "../readObserverHook";
import { vi } from "vitest";
import { useRef } from "react";

const mockIntersectionObserver = vi.fn();
const mockObserve = vi.fn();
const mockDisconnect = vi.fn();

beforeEach(() => {
  vi.resetAllMocks();
  global.IntersectionObserver = mockIntersectionObserver.mockReturnValue({
    observe: mockObserve,
    disconnect: mockDisconnect,
  } as any);
});

describe("useReadObserver", () => {
  it("should call onRead callback when element is intersecting", () => {
    const onRead = vi.fn();

    const TestComponent = () => {
      const ref = useReadObserver(onRead);
      return (
        <div ref={ref} data-testid="observed-element">
          Test
        </div>
      );
    };

    render(<TestComponent />);

    const element = screen.getByTestId("observed-element");
    expect(element).toBeInTheDocument();

    expect(mockIntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      { threshold: 0.5 },
    );
    expect(mockObserve).toHaveBeenCalledWith(element);

    const callback = mockIntersectionObserver.mock.calls[0][0];
    callback([{ isIntersecting: true }]);

    expect(onRead).toHaveBeenCalled();
    expect(mockDisconnect).toHaveBeenCalled();
  });

  it("should not call onRead when element is not intersecting", () => {
    const onRead = vi.fn();

    const TestComponent = () => {
      const ref = useReadObserver(onRead);
      return (
        <div ref={ref} data-testid="observed-element">
          Test
        </div>
      );
    };

    render(<TestComponent />);

    const callback = mockIntersectionObserver.mock.calls[0][0];
    callback([{ isIntersecting: false }]);

    expect(onRead).not.toHaveBeenCalled();
    expect(mockDisconnect).not.toHaveBeenCalled();
  });

  it("should clean up observer on unmount", () => {
    const onRead = vi.fn();

    const TestComponent = () => {
      const ref = useReadObserver(onRead);
      return <div ref={ref}>Test</div>;
    };

    const { unmount } = render(<TestComponent />);

    unmount();

    expect(mockDisconnect).toHaveBeenCalled();
  });

  it("should not set up observer if ref is null", () => {
    vi.spyOn({ useRef }, "useRef").mockReturnValue({ current: null });

    const onRead = vi.fn();

    const TestComponent = () => {
      const ref = useReadObserver(onRead);
      return <div>Test</div>;
    };

    render(<TestComponent />);

    expect(mockIntersectionObserver).not.toHaveBeenCalled();
    expect(mockObserve).not.toHaveBeenCalled();
    expect(mockDisconnect).not.toHaveBeenCalled();
  });
});
