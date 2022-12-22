import { createBrowserRouter } from "react-router-dom";
import Home from '../pages/Home';
import Movie from "../pages/Movie";

const router = createBrowserRouter([
    {
        path: '/',
        index: true,
        element: <Home />
    },
    {
        path: '/movies/:movieId',
        element: <Movie />
    }
]);

export default router;