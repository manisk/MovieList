import { createBrowserRouter } from "react-router-dom";
import Home from "./components/Home/Home";
import AddMovie from "./components/AddMovies/AddMovie";
import UpdateMovie from "./components/UpdateMovie/UpdateMovie";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/addmovie",
    element: <AddMovie />,
  },
  {
    path: "/updatemovie",
    element: <UpdateMovie />,
  },
]);
