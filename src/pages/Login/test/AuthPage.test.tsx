// import { render, screen, fireEvent } from "@testing-library/react";
// import AuthPage from "../AuthPage";
// import { Provider } from "react-redux";
// import { MemoryRouter } from "react-router-dom";
// import configureStore from "redux-mock-store";

// const mockStore = configureStore();

// describe("AuthPage Component", () => {
//   let store: any;

//   beforeEach(() => {
//     store = mockStore({
//       user: { user: null },
//     });
//   });

//   it("renders the form elements", () => {
//     render(
//       <Provider store={store}>
//         <MemoryRouter>
//           <AuthPage />
//         </MemoryRouter>
//       </Provider>,
//     );

//     expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
//     expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
//     expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
//     expect(
//       screen.getByRole("button", { name: /Sign In \/ Sign Up/i }),
//     ).toBeInTheDocument();
//   });

//   it("shows email validation error on incorrect input", () => {
//     render(
//       <Provider store={store}>
//         <MemoryRouter>
//           <AuthPage />
//         </MemoryRouter>
//       </Provider>,
//     );

//     fireEvent.change(screen.getByLabelText(/Email/i), {
//       target: { value: "invalidemail" },
//     });
//     fireEvent.blur(screen.getByLabelText(/Email/i));

//     expect(
//       screen.getByText(/Please enter a valid email address/i),
//     ).toBeInTheDocument();
//   });

//   it("dispatches setUser on valid submit", () => {
//     render(
//       <Provider store={store}>
//         <MemoryRouter>
//           <AuthPage />
//         </MemoryRouter>
//       </Provider>,
//     );

//     fireEvent.change(screen.getByLabelText(/Name/i), {
//       target: { value: "John Doe" },
//     });
//     fireEvent.change(screen.getByLabelText(/Email/i), {
//       target: { value: "john@example.com" },
//     });
//     fireEvent.change(screen.getByLabelText(/Password/i), {
//       target: { value: "Password123!" },
//     });

//     fireEvent.click(
//       screen.getByRole("button", { name: /Sign In \/ Sign Up/i }),
//     );

//     const actions = store.getActions();
//     expect(actions[0].type).toBe("SET_USER");
//     expect(actions[0].payload).toMatchObject({
//       name: "John Doe",
//       email: "john@example.com",
//       password: "Password123!",
//       imageUrl: "/assets/default-user.png",
//     });
//   });
// });

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { legacy_createStore as createStore } from "redux";
import AuthPage from "../AuthPage";

// Mock the GoogleSignIn component
vi.mock("../GoogleSignIn", () => ({
  default: () => <div data-testid="google-signin">Google Sign In</div>,
}));

// Mock the Redux action
vi.mock("../../../redux/action/userAction", () => ({
  setUser: (payload: any) => ({
    type: "SET_USER",
    payload,
  }),
}));

// Mock react-router-dom navigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock window.alert
const mockAlert = vi.fn();
Object.defineProperty(window, "alert", {
  writable: true,
  value: mockAlert,
});

// Root reducer that matches your actual Redux store structure
const rootReducer = (state = { user: { user: null } }, action: any) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: {
          ...state.user,
          user: action.payload,
        },
      };
    default:
      return state;
  }
};

// Create a mock store
const createMockStore = (initialState = { user: { user: null } }) => {
  return createStore(rootReducer, initialState);
};

// Test wrapper component
const TestWrapper = ({ children, store = createMockStore() }) => {
  const theme = createTheme();
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
};

describe("AuthPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockAlert.mockClear();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("Rendering", () => {
    it("renders all form elements correctly", () => {
      render(
        <TestWrapper>
          <AuthPage />
        </TestWrapper>,
      );

      // Target the heading specifically instead of just text
      expect(
        screen.getByRole("heading", { name: /sign in \/ sign up/i }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("textbox", { name: /name/i }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("textbox", { name: /email/i }),
      ).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /sign in \/ sign up/i }),
      ).toBeInTheDocument();
      expect(screen.getByText("OR")).toBeInTheDocument();
      expect(screen.getByTestId("google-signin")).toBeInTheDocument();
    });

    it("renders password visibility toggle button", () => {
      render(
        <TestWrapper>
          <AuthPage />
        </TestWrapper>,
      );

      // The password field should have a toggle button
      const passwordField = screen.getByLabelText(/password/i);
      expect(passwordField).toBeInTheDocument();

      // Look for the visibility toggle button (it's an IconButton within the password field)
      const buttons = screen.getAllByRole("button");
      const toggleButton = buttons.find(
        (button) =>
          button.closest("[data-testid], .MuiInputAdornment-root") ||
          button.getAttribute("aria-label")?.includes("password") ||
          !button.textContent?.includes("Sign In"),
      );
      expect(toggleButton).toBeInTheDocument();
    });
  });

  describe("Navigation", () => {
    it("navigates to home page when user is already logged in", () => {
      const storeWithUser = createMockStore({
        user: { user: { email: "test@example.com", name: "Test User" } },
      });

      render(
        <TestWrapper store={storeWithUser}>
          <AuthPage />
        </TestWrapper>,
      );

      expect(mockNavigate).toHaveBeenCalledWith("/");
    });

    it("navigates to home page when user is stored as string", () => {
      const storeWithStringUser = createMockStore({
        user: {
          user: JSON.stringify({
            user: { email: "test@example.com", name: "Test User" },
          }),
        },
      });

      render(
        <TestWrapper store={storeWithStringUser}>
          <AuthPage />
        </TestWrapper>,
      );

      expect(mockNavigate).toHaveBeenCalledWith("/");
    });

    it("does not navigate when user is not logged in", () => {
      render(
        <TestWrapper>
          <AuthPage />
        </TestWrapper>,
      );

      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });

  describe("Form Validation", () => {
    describe("Email Validation", () => {
      it("shows error for invalid email format", async () => {
        const user = userEvent.setup();
        render(
          <TestWrapper>
            <AuthPage />
          </TestWrapper>,
        );

        const emailInput = screen.getByRole("textbox", { name: /email/i });
        await user.type(emailInput, "invalid-email");
        await user.tab(); // Trigger blur to show validation

        await waitFor(() => {
          expect(
            screen.getByText("Please enter a valid email address"),
          ).toBeInTheDocument();
        });
      });

      it("clears error for valid email format", async () => {
        const user = userEvent.setup();
        render(
          <TestWrapper>
            <AuthPage />
          </TestWrapper>,
        );

        const emailInput = screen.getByRole("textbox", { name: /email/i });
        await user.type(emailInput, "invalid-email");
        await user.tab();

        await waitFor(() => {
          expect(
            screen.getByText("Please enter a valid email address"),
          ).toBeInTheDocument();
        });

        await user.clear(emailInput);
        await user.type(emailInput, "valid@example.com");

        await waitFor(() => {
          expect(
            screen.queryByText("Please enter a valid email address"),
          ).not.toBeInTheDocument();
        });
      });

      it("shows error for empty email", async () => {
        const user = userEvent.setup();
        render(
          <TestWrapper>
            <AuthPage />
          </TestWrapper>,
        );

        const emailInput = screen.getByRole("textbox", { name: /email/i });
        await user.type(emailInput, "test@example.com");
        await user.clear(emailInput);
        await user.tab();

        await waitFor(() => {
          expect(
            screen.getByText("Please enter a valid email address"),
          ).toBeInTheDocument();
        });
      });
    });

    describe("Password Validation", () => {
      it("shows error for password less than 8 characters", async () => {
        const user = userEvent.setup();
        render(
          <TestWrapper>
            <AuthPage />
          </TestWrapper>,
        );

        const passwordInput = screen.getByLabelText(/password/i);
        await user.type(passwordInput, "short");

        await waitFor(() => {
          expect(
            screen.getByText("At least 8 characters required"),
          ).toBeInTheDocument();
        });
      });

      it("shows error for password without uppercase letter", async () => {
        const user = userEvent.setup();
        render(
          <TestWrapper>
            <AuthPage />
          </TestWrapper>,
        );

        const passwordInput = screen.getByLabelText(/password/i);
        await user.type(passwordInput, "lowercase123!");

        await waitFor(() => {
          expect(
            screen.getByText("Must contain an uppercase letter"),
          ).toBeInTheDocument();
        });
      });

      it("shows error for password without lowercase letter", async () => {
        const user = userEvent.setup();
        render(
          <TestWrapper>
            <AuthPage />
          </TestWrapper>,
        );

        const passwordInput = screen.getByLabelText(/password/i);
        await user.type(passwordInput, "UPPERCASE123!");

        await waitFor(() => {
          expect(
            screen.getByText("Must contain a lowercase letter"),
          ).toBeInTheDocument();
        });
      });

      it("shows error for password without number", async () => {
        const user = userEvent.setup();
        render(
          <TestWrapper>
            <AuthPage />
          </TestWrapper>,
        );

        const passwordInput = screen.getByLabelText(/password/i);
        await user.type(passwordInput, "Password!");

        await waitFor(() => {
          expect(screen.getByText("Must contain a number")).toBeInTheDocument();
        });
      });

      it("shows error for password without special character", async () => {
        const user = userEvent.setup();
        render(
          <TestWrapper>
            <AuthPage />
          </TestWrapper>,
        );

        const passwordInput = screen.getByLabelText(/password/i);
        await user.type(passwordInput, "Password123");

        await waitFor(() => {
          expect(
            screen.getByText("Must contain a special character"),
          ).toBeInTheDocument();
        });
      });

      it("clears error for valid password", async () => {
        const user = userEvent.setup();
        render(
          <TestWrapper>
            <AuthPage />
          </TestWrapper>,
        );

        const passwordInput = screen.getByLabelText(/password/i);
        await user.type(passwordInput, "short");

        await waitFor(() => {
          expect(
            screen.getByText("At least 8 characters required"),
          ).toBeInTheDocument();
        });

        await user.clear(passwordInput);
        await user.type(passwordInput, "ValidPass123!");

        await waitFor(() => {
          expect(
            screen.queryByText("At least 8 characters required"),
          ).not.toBeInTheDocument();
        });
      });
    });
  });

  describe("Password Visibility Toggle", () => {
    it("toggles password visibility when clicking the icon", async () => {
      const user = userEvent.setup();
      render(
        <TestWrapper>
          <AuthPage />
        </TestWrapper>,
      );

      const passwordInput = screen.getByLabelText(/password/i);
      // Find the toggle button - it should be the button that's not the submit button
      const allButtons = screen.getAllByRole("button");
      const toggleButton = allButtons.find(
        (button) =>
          !button.textContent?.includes("Sign In") &&
          !button.textContent?.includes("Sign Up"),
      );

      expect(toggleButton).toBeInTheDocument();

      // Initially password should be hidden
      expect(passwordInput).toHaveAttribute("type", "password");

      // Click to show password
      await user.click(toggleButton!);
      expect(passwordInput).toHaveAttribute("type", "text");

      // Click to hide password again
      await user.click(toggleButton!);
      expect(passwordInput).toHaveAttribute("type", "password");
    });
  });

  describe("Form Submission", () => {
    it("submits form with valid data", async () => {
      const user = userEvent.setup();
      const mockStore = createMockStore();
      const dispatchSpy = vi.spyOn(mockStore, "dispatch");

      render(
        <TestWrapper store={mockStore}>
          <AuthPage />
        </TestWrapper>,
      );

      // Fill in valid form data
      await user.type(
        screen.getByRole("textbox", { name: /name/i }),
        "John Doe",
      );
      await user.type(
        screen.getByRole("textbox", { name: /email/i }),
        "john@example.com",
      );
      await user.type(screen.getByLabelText(/password/i), "ValidPass123!");

      // Submit form
      await user.click(
        screen.getByRole("button", { name: /sign in \/ sign up/i }),
      );

      await waitFor(() => {
        expect(dispatchSpy).toHaveBeenCalledWith({
          type: "SET_USER",
          payload: {
            name: "John Doe",
            email: "john@example.com",
            password: "ValidPass123!",
            imageUrl: "/assets/default-user.png",
          },
        });
      });
    });

    it("does not submit form with invalid email", async () => {
      const user = userEvent.setup();
      const mockStore = createMockStore();
      const dispatchSpy = vi.spyOn(mockStore, "dispatch");

      render(
        <TestWrapper store={mockStore}>
          <AuthPage />
        </TestWrapper>,
      );

      await user.type(
        screen.getByRole("textbox", { name: /name/i }),
        "John Doe",
      );
      await user.type(
        screen.getByRole("textbox", { name: /email/i }),
        "invalid-email",
      );
      await user.type(screen.getByLabelText(/password/i), "ValidPass123!");

      await user.click(
        screen.getByRole("button", { name: /sign in \/ sign up/i }),
      );

      // Wait for validation to occur
      await waitFor(() => {
        expect(
          screen.getByText("Please enter a valid email address"),
        ).toBeInTheDocument();
      });

      // Should not have dispatched due to validation errors
      expect(dispatchSpy).not.toHaveBeenCalledWith(
        expect.objectContaining({
          type: "SET_USER",
        }),
      );
    });

    it("does not submit form with invalid password", async () => {
      const user = userEvent.setup();
      const mockStore = createMockStore();
      const dispatchSpy = vi.spyOn(mockStore, "dispatch");

      render(
        <TestWrapper store={mockStore}>
          <AuthPage />
        </TestWrapper>,
      );

      await user.type(
        screen.getByRole("textbox", { name: /name/i }),
        "John Doe",
      );
      await user.type(
        screen.getByRole("textbox", { name: /email/i }),
        "john@example.com",
      );
      await user.type(screen.getByLabelText(/password/i), "weak");

      await user.click(
        screen.getByRole("button", { name: /sign in \/ sign up/i }),
      );

      await waitFor(() => {
        expect(
          screen.getByText("At least 8 characters required"),
        ).toBeInTheDocument();
      });

      // Should not have dispatched due to validation errors
      expect(dispatchSpy).not.toHaveBeenCalledWith(
        expect.objectContaining({
          type: "SET_USER",
        }),
      );
    });

    it("shows alert for empty name", async () => {
      const user = userEvent.setup();

      render(
        <TestWrapper>
          <AuthPage />
        </TestWrapper>,
      );

      await user.type(
        screen.getByRole("textbox", { name: /email/i }),
        "john@example.com",
      );
      await user.type(screen.getByLabelText(/password/i), "ValidPass123!");

      await user.click(
        screen.getByRole("button", { name: /sign in \/ sign up/i }),
      );

      await waitFor(() => {
        expect(mockAlert).toHaveBeenCalledWith("Please enter your name");
      });
    });

    it("clears form fields after successful submission", async () => {
      const user = userEvent.setup();
      const mockStore = createMockStore();

      render(
        <TestWrapper store={mockStore}>
          <AuthPage />
        </TestWrapper>,
      );

      const nameInput = screen.getByRole("textbox", { name: /name/i });
      const emailInput = screen.getByRole("textbox", { name: /email/i });
      const passwordInput = screen.getByLabelText(/password/i);

      await user.type(nameInput, "John Doe");
      await user.type(emailInput, "john@example.com");
      await user.type(passwordInput, "ValidPass123!");

      await user.click(
        screen.getByRole("button", { name: /sign in \/ sign up/i }),
      );

      await waitFor(() => {
        expect(nameInput).toHaveValue("");
        expect(emailInput).toHaveValue("");
        expect(passwordInput).toHaveValue("");
      });
    });
  });

  describe("Accessibility", () => {
    it("has proper form labels", () => {
      render(
        <TestWrapper>
          <AuthPage />
        </TestWrapper>,
      );

      expect(
        screen.getByRole("textbox", { name: /name/i }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("textbox", { name: /email/i }),
      ).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    });

    it("has proper error announcements", async () => {
      const user = userEvent.setup();
      render(
        <TestWrapper>
          <AuthPage />
        </TestWrapper>,
      );

      const emailInput = screen.getByRole("textbox", { name: /email/i });
      await user.type(emailInput, "invalid");
      await user.tab();

      await waitFor(() => {
        const errorElement = screen.getByText(
          "Please enter a valid email address",
        );
        expect(errorElement).toBeInTheDocument();
        expect(emailInput).toHaveAttribute("aria-invalid", "true");
      });
    });
  });
});
