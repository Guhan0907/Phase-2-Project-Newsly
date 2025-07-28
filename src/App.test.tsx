import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./redux/store";

const DummyOutlet = () => <div data-testid="dummy-outlet">Outlet Content</div>;

describe("App Layout", () => {
  it("renders Header, Outlet, and Footer", () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<DummyOutlet />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId("dummy-outlet")).toBeInTheDocument();

    expect(screen.getByTestId("footer")).toBeInTheDocument();

    expect(screen.getByTestId("Newsly Logo")).toBeInTheDocument();
  });
});
