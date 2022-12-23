import { createBrowserRouter } from "react-router-dom";
import Home from '../pages/Home';
import Movie from "../pages/Movie";
import Login from "../pages/Login";
import LikedMovies from "../pages/LikedMovies";
import Register from "../pages/Register";

const router = createBrowserRouter([
    {
        path: '/',
        index: true,
        element: <Home />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/movies/likedmovies',
        element: <LikedMovies />
    },
    {
        path: '/movies/:movieId',
        element: <Movie />
    }
]);

export default router;