import MainNavigation from "./components/MainNavigation";
import Home from "./pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import AddRecipee from "./pages/AddRecipee";
import MyRecipees from "./pages/MyRecipees";
import Favourites from "./pages/Favourites";
import RecipeeDetail from "./pages/RecipeeDetail";
import EditProfile from "./pages/EditProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainNavigation></MainNavigation>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <Signup></Signup>,
      },
      {
        path: "/my-recipees",
        element: (
          <ProtectedRoute>
            <MyRecipees />
          </ProtectedRoute>
        ),
      },
      {
        path: "/favourites",
        element: (
          <ProtectedRoute>
            <Favourites />
          </ProtectedRoute>
        ),
      },
      {
        path: "/add-recipee",
        element: (
          <ProtectedRoute>
            <AddRecipee />
          </ProtectedRoute>
        ),
      },
      {
        path: "/edit-profile",
        element: (
          <ProtectedRoute>
            <EditProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/recipee/:id",
        element: <RecipeeDetail />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
