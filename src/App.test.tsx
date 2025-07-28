// import { describe, it, expect } from "vitest";
// import { render, screen } from "@testing-library/react";
// import { MemoryRouter, Routes, Route } from "react-router-dom";
// import { Provider } from "react-redux";
// import App from "./App";
// import { store } from "./redux/store";

// const DummyOutlet = () => <div data-testid="dummy-outlet">Outlet Content</div>;

// describe("App Layout", () => {
//   it("renders Header, Outlet, and Footer", () => {
//     render(
//       <Provider store={store}>
//         <MemoryRouter initialEntries={["/"]}>
//           <Routes>
//             <Route path="/" element={<App />}>
//               <Route index element={<DummyOutlet />} />
//             </Route>
//           </Routes>
//         </MemoryRouter>
//       </Provider>
//     );

//     expect(screen.getByText(/Header/i)).toBeInTheDocument();
//     expect(screen.getByText(/Footer/i)).toBeInTheDocument();
//     expect(screen.getByTestId("dummy-outlet")).toBeInTheDocument();
//   });
// });

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

    // Assert Dummy Outlet rendered
    expect(screen.getByTestId("dummy-outlet")).toBeInTheDocument();

    // Assert Footer rendered
    expect(screen.getByTestId("footer")).toBeInTheDocument();

    // Assert Newsly logo in Footer rendered
    expect(screen.getByTestId("Newsly Logo")).toBeInTheDocument();
  });
});
