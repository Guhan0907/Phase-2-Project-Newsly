import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import ProtectedRoutes from "./ProtectedRoutes";

const mockStore = configureMockStore();

const DummyProtectedComponent = () => <div>Protected Content</div>;
const DummyAuthPage = () => <div>Auth Page</div>;

describe("ProtectedRoutes", () => {
  it("redirects to /auth if user is not authenticated", () => {
    const store = mockStore({ user: { user: null } });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/protected"]}>
          <Routes>
            <Route
              path="/protected"
              element={
                <ProtectedRoutes>
                  <DummyProtectedComponent />
                </ProtectedRoutes>
              }
            />
            <Route path="/auth" element={<DummyAuthPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText("Auth Page")).toBeInTheDocument();
  });

  it("renders protected content if user is authenticated (object format)", () => {
    const store = mockStore({
      user: { user: { email: "test@example.com" } },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/protected"]}>
          <Routes>
            <Route
              path="/protected"
              element={
                <ProtectedRoutes>
                  <DummyProtectedComponent />
                </ProtectedRoutes>
              }
            />
            <Route path="/auth" element={<DummyAuthPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText("Protected Content")).toBeInTheDocument();
  });

  it("renders protected content if user is stored as JSON string", () => {
    const store = mockStore({
      user: {
        user: JSON.stringify({ user: { email: "test@example.com" } }),
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/protected"]}>
          <Routes>
            <Route
              path="/protected"
              element={
                <ProtectedRoutes>
                  <DummyProtectedComponent />
                </ProtectedRoutes>
              }
            />
            <Route path="/auth" element={<DummyAuthPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText("Protected Content")).toBeInTheDocument();
  });
});
