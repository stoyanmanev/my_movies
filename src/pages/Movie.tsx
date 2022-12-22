import React from "react";
import router from "../router/Router";
import { Layout } from "antd";
import { Link } from "react-router-dom";
import { Provider } from "mobx-react";
import MoviesStore from "../store/MoviesStore";
import Sider from "antd/es/layout/Sider";
import classes from "./Home.module.css";
import Branding from "../components/branding/Branding";
import MainNavigation from "../components/navigation/MainNavigation";
import ItemNotFound from "../components/UI/ItemNotFound";
import MovieContent from "../components/movies/MovieContent";

const Movie: React.FC = () => {
  const movieId = router.state.matches[0].params.movieId || null;

  return (
    <Provider MoviesStore={MoviesStore}>
      <Layout>
        <Sider className={classes["sider-padding"]}>
          <Branding />
          <MainNavigation />
        </Sider>
        <Layout className={classes["main-part"]}>
          {movieId === null && (
            <ItemNotFound
              title="The film could not be found."
              extra={<Link to="/">Back to Home</Link>}
            />
          )}
          {movieId !== null && <MovieContent  id={movieId}/>}
        </Layout>
      </Layout>
    </Provider>
  );
};

export default Movie;
