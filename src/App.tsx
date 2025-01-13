import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import { Helper } from "./pages/helper";
import { OrderPage } from "./pages/order";
import { HistoryPage } from "./pages/history";

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
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
