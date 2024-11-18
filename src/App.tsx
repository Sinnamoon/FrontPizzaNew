import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/home';
import { Helper } from './pages/helper';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "helper",
        element: <Helper />,
      },
    ],
  },
]);

function App() {
  
  return (
    <RouterProvider router={router} />

  );
}

export default App;
