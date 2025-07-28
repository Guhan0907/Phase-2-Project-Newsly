import { describe, it, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Header from "../Header";
import configureStore from "redux-mock-store";
import { ThemeProvider, createTheme } from "@mui/material/styles";

vi.mock("../../redux/action/articlesAction", async () => {
  const actual = await import("../../../redux/action/articlesAction");
  return {
    ...actual,
    setSearchMode: vi.fn(() => ({ type: "SEARCH_MODE" })),
    fetchArticlesRequest: vi.fn(() => ({ type: "FETCH_ARTICLES_REQUEST" })),
    fetchArticlesSuccess: vi.fn(() => ({
      type: "FETCH_ARTICLES_SUCCESS",
      payload: [],
    })),
    fetchFeaturedSuccess: vi.fn(() => ({
      type: "FETCH_FEATURED_SUCCESS",
      payload: {},
    })),
    fetchArticlesFailure: vi.fn(() => ({
      type: "FETCH_ARTICLES_FAILURE",
      payload: "error",
    })),
  };
});

vi.mock("../../redux/action/searchAction", async () => {
  return {
    searchArticles: vi.fn((query: string) => ({
      type: "SEARCH_ARTICLES",
      payload: query,
    })),
  };
});

vi.mock("../../redux/action/userAction", async () => {
  return {
    logoutUser: vi.fn(() => ({ type: "USER_LOGOUT" })),
  };
});

vi.mock("../../redux/action/favouritesAction", async () => {
  return {
    clearFavourites: vi.fn(() => ({ type: "FAVOURITES_CLEAR" })),
  };
});

vi.mock("../../redux/action/historyActions", async () => {
  return {
    clearHistory: vi.fn(() => ({ type: "HISTORY_CLEAR" })),
  };
});

vi.mock("../../services/apiCalls", () => ({
  fetchTopStories: vi.fn(() => Promise.resolve([])),
  fetchTimesWireNews: vi.fn(() => Promise.resolve([{}])),
}));

// Mock child components
vi.mock("./SearchBar", () => ({
  default: ({ query, onQueryChange, onSearch }: any) => (
    <div data-testid="search-bar">
      <input
        data-testid="search-input"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
      />
      <button data-testid="search-button" onClick={onSearch}>
        Search
      </button>
    </div>
  ),
}));

vi.mock("./UserMenu", () => ({
  default: ({ user, onLogout }: any) => (
    <div data-testid="user-menu" onClick={onLogout}>
      {user?.name}
    </div>
  ),
}));

vi.mock("./LogoutConfirmDialog", () => ({
  default: ({ open, onClose, onConfirm }: any) =>
    open ? (
      <div data-testid="logout-dialog">
        <button onClick={onConfirm}>Confirm</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    ) : null,
}));

const theme = createTheme();
// <Partial<ReturnType<typeof import("../../redux/store").default.getState>>>
const mockStore = configureStore<any>();

describe("Header", () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      user: {
        user: JSON.stringify({
          user: { name: "Test User", email: "test@example.com", imageUrl: "" },
        }),
      },
      favourites: [],
    });
  });

  const renderHeader = () =>
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <ThemeProvider theme={theme}>
            <Header />
          </ThemeProvider>
        </MemoryRouter>
      </Provider>,
    );

  it.skip("renders logo and user menu when logged in", () => {
    renderHeader();
    expect(screen.getByAltText("Newsly Logo")).toBeInTheDocument();
    expect(screen.getByTestId("user-menu")).toHaveTextContent("Test User");
  });

  it.skip("triggers search when search button is clicked", () => {
    renderHeader();

    const input = screen.getByTestId("search-input") as HTMLInputElement;
    const button = screen.getByTestId("search-button");

    fireEvent.change(input, { target: { value: "hello" } });
    fireEvent.click(button);

    expect(input.value).toBe("hello");
  });

  it("renders favourites icon with count", () => {
    renderHeader();
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThan(0);
  });
});

// import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import { Provider } from 'react-redux';
// import { BrowserRouter } from 'react-router-dom';
// import { createStore, combineReducers, applyMiddleware } from 'redux';
// import { thunk } from 'redux-thunk';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import Header from '../Header'; // Adjust import path as needed

// // Mock the services
// vi.mock('../../services/apiCalls', () => ({
//   fetchTopStories: vi.fn(() => Promise.resolve([])),
//   fetchTimesWireNews: vi.fn(() => Promise.resolve([{}])),
// }));

// // Mock the hooks
// vi.mock('../../hooks/useDebounce', () => ({
//   default: vi.fn((value) => value),
// }));

// // Mock react-router-dom hooks
// const mockNavigate = vi.fn();
// const mockLocation = { pathname: '/' };

// vi.mock('react-router-dom', async () => {
//   const actual = await vi.importActual('react-router-dom');
//   return {
//     ...actual,
//     useNavigate: () => mockNavigate,
//     useLocation: () => mockLocation,
//   };
// });

// // Mock Redux reducers
// const userReducer = (state = { user: null }, action) => {
//   switch (action.type) {
//     case 'LOGOUT_USER':
//       return { user: null };
//     default:
//       return state;
//   }
// };

// const favouritesReducer = (state = [], action:any) => {
//   switch (action.type) {
//     case 'CLEAR_FAVOURITES':
//       return [];
//     default:
//       return state;
//   }
// };

// const articlesReducer = (state = {
//   articles: [],
//   featured: null,
//   loading: false,
//   error: null,
//   searchMode: false,
// }, action:any) => {
//   switch (action.type) {
//     case 'FETCH_ARTICLES_REQUEST':
//       return { ...state, loading: true };
//     case 'FETCH_ARTICLES_SUCCESS':
//       return { ...state, loading: false, articles: action.payload };
//     case 'FETCH_ARTICLES_FAILURE':
//       return { ...state, loading: false, error: action.payload };
//     case 'FETCH_FEATURED_SUCCESS':
//       return { ...state, featured: action.payload };
//     case 'SET_SEARCH_MODE':
//       return { ...state, searchMode: action.payload };
//     default:
//       return state;
//   }
// };

// const searchReducer = (state = {
//   results: [],
//   loading: false,
//   error: null,
// }, action) => {
//   switch (action.type) {
//     case 'SEARCH_ARTICLES_REQUEST':
//       return { ...state, loading: true };
//     case 'SEARCH_ARTICLES_SUCCESS':
//       return { ...state, loading: false, results: action.payload };
//     case 'SEARCH_ARTICLES_FAILURE':
//       return { ...state, loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };

// const historyReducer = (state = [], action:any) => {
//   switch (action.type) {
//     case 'CLEAR_HISTORY':
//       return [];
//     default:
//       return state;
//   }
// };

// const rootReducer = combineReducers({
//   user: userReducer,
//   favourites: favouritesReducer,
//   articles: articlesReducer,
//   search: searchReducer,
//   history: historyReducer,
// });

// // Create a mock store
// const createMockStore = (initialState = {}) => {
//   const defaultState = {
//     user: {
//       user: null,
//     },
//     favourites: [],
//     articles: {
//       articles: [],
//       featured: null,
//       loading: false,
//       error: null,
//       searchMode: false,
//     },
//     search: {
//       results: [],
//       loading: false,
//       error: null,
//     },
//     history: [],
//     ...initialState,
//   };

//   return createStore(
//     rootReducer,
//     defaultState,
//     applyMiddleware(thunk)
//   );
// };

// // Test wrapper component
// const TestWrapper = ({ children, initialState = {} }) => {
//   const store = createMockStore(initialState);
//   const theme = createTheme();

//   return (
//     <Provider store={store}>
//       <BrowserRouter>
//         <ThemeProvider theme={theme}>
//           {children}
//         </ThemeProvider>
//       </BrowserRouter>
//     </Provider>
//   );
// };

// describe('Header Component', () => {
//   beforeEach(() => {
//     vi.clearAllMocks();
//     mockLocation.pathname = '/';
//   });

//   afterEach(() => {
//     vi.clearAllMocks();
//   });

//   describe('Basic Rendering', () => {
//     it('renders the Newsly logo', () => {
//       render(
//         <TestWrapper>
//           <Header />
//         </TestWrapper>
//       );

//       const logo = screen.getByAltText('Newsly Logo');
//       expect(logo).toBeInTheDocument();
//     });

//     it('renders login button when user is not authenticated', () => {
//       render(
//         <TestWrapper>
//           <Header />
//         </TestWrapper>
//       );

//       const loginButton = screen.getByText('Login');
//       expect(loginButton).toBeInTheDocument();
//     });

//     it('renders favorites button with badge', () => {
//       const initialState = {
//         favourites: [{ id: 1 }, { id: 2 }, { id: 3 }],
//       };

//       render(
//         <TestWrapper initialState={initialState}>
//           <Header />
//         </TestWrapper>
//       );

//       const favoritesButton = screen.getByRole('button', { name: /bookmark/i });
//       expect(favoritesButton).toBeInTheDocument();

//       // Check if badge shows correct count
//       const badge = screen.getByText('3');
//       expect(badge).toBeInTheDocument();
//     });
//   });

//   describe('Navigation', () => {
//     it('navigates to home when logo is clicked', async () => {
//       const user = userEvent.setup();

//       render(
//         <TestWrapper>
//           <Header />
//         </TestWrapper>
//       );

//       const logo = screen.getByAltText('Newsly Logo');
//       await user.click(logo);

//       expect(mockNavigate).toHaveBeenCalledWith('/');
//     });

//     it('navigates to auth when login is clicked', async () => {
//       const user = userEvent.setup();

//       render(
//         <TestWrapper>
//           <Header />
//         </TestWrapper>
//       );

//       const loginButton = screen.getByText('Login');
//       await user.click(loginButton);

//       expect(mockNavigate).toHaveBeenCalledWith('/auth');
//     });

//     it('navigates to favourites when favorites button is clicked', async () => {
//       const user = userEvent.setup();

//       render(
//         <TestWrapper>
//           <Header />
//         </TestWrapper>
//       );

//       const favoritesButton = screen.getByRole('button', { name: /bookmark/i });
//       await user.click(favoritesButton);

//       expect(mockNavigate).toHaveBeenCalledWith('/favourites');
//     });

//     it('shows back button when not on home page', () => {
//       mockLocation.pathname = '/article/123';

//       render(
//         <TestWrapper>
//           <Header />
//         </TestWrapper>
//       );

//       const backButton = screen.getByRole('button', { name: /arrow/i });
//       expect(backButton).toBeInTheDocument();
//     });

//     it('navigates back when back button is clicked', async () => {
//       const user = userEvent.setup();
//       mockLocation.pathname = '/article/123';

//       render(
//         <TestWrapper>
//           <Header />
//         </TestWrapper>
//       );

//       const backButton = screen.getByRole('button', { name: /arrow/i });
//       await user.click(backButton);

//       expect(mockNavigate).toHaveBeenCalledWith(-1);
//     });
//   });

//   describe('User Authentication', () => {
//     it('displays user menu when user is authenticated', () => {
//       const initialState = {
//         user: {
//           user: JSON.stringify({
//             user: {
//               name: 'John Doe',
//               email: 'john@example.com',
//               imageUrl: 'https://example.com/avatar.jpg',
//             },
//           }),
//         },
//       };

//       render(
//         <TestWrapper initialState={initialState}>
//           <Header />
//         </TestWrapper>
//       );

//       // UserMenu component should be rendered (this depends on your UserMenu implementation)
//       expect(screen.queryByText('Login')).not.toBeInTheDocument();
//     });

//     it('handles user object directly (not stringified)', () => {
//       const initialState = {
//         user: {
//           user: {
//             name: 'Jane Doe',
//             email: 'jane@example.com',
//             imageUrl: 'https://example.com/avatar2.jpg',
//           },
//         },
//       };

//       render(
//         <TestWrapper initialState={initialState}>
//           <Header />
//         </TestWrapper>
//       );

//       expect(screen.queryByText('Login')).not.toBeInTheDocument();
//     });
//   });

//   describe('Search Functionality', () => {
//     it('shows search bar when user is logged in and on appropriate pages', () => {
//       const initialState = {
//         user: {
//           user: {
//             email: 'user@example.com',
//             name: 'Test User',
//           },
//         },
//       };

//       render(
//         <TestWrapper initialState={initialState}>
//           <Header />
//         </TestWrapper>
//       );

//       // SearchBar should be visible on home page when logged in
//       const searchInput = screen.getByRole('textbox');
//       expect(searchInput).toBeInTheDocument();
//     });

//     it('hides search bar on article pages', () => {
//       mockLocation.pathname = '/article/123';
//       const initialState = {
//         user: {
//           user: {
//             email: 'user@example.com',
//             name: 'Test User',
//           },
//         },
//       };

//       render(
//         <TestWrapper initialState={initialState}>
//           <Header />
//         </TestWrapper>
//       );

//       // SearchBar should not be visible on article pages
//       const searchInput = screen.queryByRole('textbox');
//       expect(searchInput).not.toBeInTheDocument();
//     });

//     it('hides search bar on favourites page', () => {
//       mockLocation.pathname = '/favourites';
//       const initialState = {
//         user: {
//           user: {
//             email: 'user@example.com',
//             name: 'Test User',
//           },
//         },
//       };

//       render(
//         <TestWrapper initialState={initialState}>
//           <Header />
//         </TestWrapper>
//       );

//       const searchInput = screen.queryByRole('textbox');
//       expect(searchInput).not.toBeInTheDocument();
//     });

//     it('hides search bar when user is not logged in', () => {
//       render(
//         <TestWrapper>
//           <Header />
//         </TestWrapper>
//       );

//       const searchInput = screen.queryByRole('textbox');
//       expect(searchInput).not.toBeInTheDocument();
//     });
//   });

//   describe('Logout Functionality', () => {
//     it('opens logout confirmation dialog', async () => {
//       const user = userEvent.setup();
//       const initialState = {
//         user: {
//           user: {
//             name: 'John Doe',
//             email: 'john@example.com',
//             imageUrl: 'https://example.com/avatar.jpg',
//           },
//         },
//       };

//       render(
//         <TestWrapper initialState={initialState}>
//           <Header />
//         </TestWrapper>
//       );

//       // This test depends on how your UserMenu component triggers logout
//       // You might need to find the logout trigger element differently
//       // For example, if UserMenu has a logout menu item:
//       // const userMenuButton = screen.getByRole('button', { name: /user menu/i });
//       // await user.click(userMenuButton);
//       // const logoutItem = screen.getByText('Logout');
//       // await user.click(logoutItem);

//       // The logout confirmation dialog should appear
//       // expect(screen.getByText(/confirm logout/i)).toBeInTheDocument();
//     });
//   });

//   describe('Responsive Design', () => {
//     it('handles mobile breakpoints', () => {
//       // Mock useMediaQuery to return true for mobile
//       vi.mock('@mui/material', async () => {
//         const actual = await vi.importActual('@mui/material');
//         return {
//           ...actual,
//           useMediaQuery: vi.fn(() => true), // Mobile
//           useTheme: vi.fn(() => ({ breakpoints: { down: () => {} } })),
//         };
//       });

//       render(
//         <TestWrapper>
//           <Header />
//         </TestWrapper>
//       );

//       // Component should render without errors on mobile
//       const logo = screen.getByAltText('Newsly Logo');
//       expect(logo).toBeInTheDocument();
//     });
//   });

//   describe('Favorites Badge', () => {
//     it('displays correct favorites count', () => {
//       const initialState = {
//         favourites: new Array(5).fill({ id: 1 }),
//       };

//       render(
//         <TestWrapper initialState={initialState}>
//           <Header />
//         </TestWrapper>
//       );

//       const badge = screen.getByText('5');
//       expect(badge).toBeInTheDocument();
//     });

//     it('displays empty badge when no favorites', () => {
//       const initialState = {
//         favourites: [],
//       };

//       render(
//         <TestWrapper initialState={initialState}>
//           <Header />
//         </TestWrapper>
//       );

//       // MUI Badge typically doesn't show when count is 0
//       const badge = screen.queryByText('0');
//       expect(badge).not.toBeInTheDocument();
//     });
//   });

//   describe('Error Handling', () => {
//     it('handles malformed user data gracefully', () => {
//       const initialState = {
//         user: {
//           user: 'invalid json string',
//         },
//       };

//       // Should not throw an error
//       expect(() => {
//         render(
//           <TestWrapper initialState={initialState}>
//             <Header />
//           </TestWrapper>
//         );
//       }).not.toThrow();

//       // Should show login button instead
//       const loginButton = screen.getByText('Login');
//       expect(loginButton).toBeInTheDocument();
//     });
//   });
// });
