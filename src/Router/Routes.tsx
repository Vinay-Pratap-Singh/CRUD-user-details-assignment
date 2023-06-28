import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import User from "../Pages/User";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/user",
    element: <User />,
  },
]);

export default routes;
