import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import ProtectedRouteComponent from "./components/ProtectedRoute";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import PageNotFoundPage from "./pages/NotFound";

const Logout = () => {
  localStorage.clear();
  return <Navigate to="/login" />;
};

// Cleanup mechanism required to prevent stale tokens (associated with other user(s)) from being passed when trying to register a new user
const LogoutThenRegister = () => {
  localStorage.clear();
  return <RegisterPage />;
};

const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRouteComponent>
        <HomePage />
      </ProtectedRouteComponent>
    ),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <LogoutThenRegister />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  // Fallback route
  {
    path: "*",
    element: <PageNotFoundPage />,
  },
]);

function App() {
  return <RouterProvider router={browserRouter} />;
}

export default App;
