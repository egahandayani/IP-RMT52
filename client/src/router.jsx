import { createBrowserRouter, redirect } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import RootLayout from "./layouts/RootLayout";
import HomePage from "./pages/HomePage";
import DetailCharacter from "./pages/DetailCharacter";
import MyCharacters from "./pages/MyCharacters";
import UpdateCharacter from "./pages/UpdateCharacter";

const router = createBrowserRouter([
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
    loader: () => {
      const access_token = localStorage.getItem("access_token");
      if (access_token) {
        throw redirect("/");
      }
      return null;
    },
  },
  // Page Home
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "",
        index: true,
        element: <HomePage />,
        loader: () => {
          const access_token = localStorage.getItem("access_token");
          if (access_token) {
            return null;
          }
          throw redirect("/login");
        },
      },
      {
        path: "/characters/:id",
        element: <DetailCharacter />,
        loader: () => {
          const access_token = localStorage.getItem("access_token");
          if (access_token) {
            return null;
          }
          throw redirect("/login");
        },
      },
      {
        path: "/myCharacters",
        element: <MyCharacters />,
        loader: () => {
          const access_token = localStorage.getItem("access_token");
          if (access_token) {
            return null;
          }
          throw redirect("/login");
        },
      },
 {
        path: "/characters/:id/update-image",
        element: <UpdateCharacter />,
        loader: () => {
          const access_token = localStorage.getItem("access_token");
          if (access_token) {
            return null;
          }
          throw redirect("/login");
        },
      },
    ],
  },
]);

export default router;
