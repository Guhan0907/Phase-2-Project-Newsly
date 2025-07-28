import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Footer from "../Footer";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";

// No thunk needed for these tests
const mockStore = configureStore();
const store = mockStore({});

vi.mock("react-redux", async () => {
  const actual =
    await vi.importActual<typeof import("react-redux")>("react-redux");
  return {
    ...actual,
    useDispatch: () => vi.fn(),
  };
});

//  Properly mock categoryAction
vi.mock("../../redux/action/categoryAction", async () => {
  const actual = await vi.importActual<
    typeof import("../../../redux/action/categoryAction")
  >("../../redux/action/categoryAction");
  return {
    ...actual,
    setCategoryFromFooter: (cat: string) => ({
      type: "SET_CATEGORY_FROM_FOOTER",
      payload: cat,
    }),
  };
});

describe("Footer Component", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Footer />
        </BrowserRouter>
      </Provider>,
    );
  });

  it("renders Newsly logo", () => {
    const logo = screen.getByAltText("Newsly Logo");
    expect(logo).toBeInTheDocument();
  });

  it("renders category list", () => {
    const categoryItem = screen.getByText(/world/i);
    expect(categoryItem).toBeInTheDocument();
  });

  it("renders subscribe input and button", () => {
    const input = screen.getByPlaceholderText(/your email/i);
    const button = screen.getByRole("button", { name: /subscribe/i });
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it("validates and shows success snackbar on valid email", async () => {
    const input = screen.getByPlaceholderText(/your email/i);
    const button = screen.getByRole("button", { name: /subscribe/i });

    fireEvent.change(input, { target: { value: "test@example.com" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/thanks for subscribing/i)).toBeInTheDocument();
    });
  });

  it("renders 'Contact Us' and developer credit", () => {
    expect(screen.getByText("Contact Us")).toBeInTheDocument();
    expect(screen.getByText(/developed by/i)).toBeInTheDocument();
  });
});
