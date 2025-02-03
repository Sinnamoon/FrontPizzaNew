import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import { Helper } from "./pages/helper";
import { OrderPage } from "./pages/order";
import { HistoryPage } from "./pages/history";
import { LoginPage } from "@/pages/login";
import { RegisterPage } from "@/pages/register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/helper",
    element: <Helper />,
  },
  {
    path: "/order",
    element: <OrderPage />,
  },

  {
    path: "/history",
    element: <HistoryPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
