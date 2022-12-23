import React from "react";
import router from "../router/Router";
import { Layout } from "antd";
import { Link } from "react-router-dom";
import { Provider } from "mobx-react";
import MoviesStore from "../store/MoviesStore";
import UserStore from "../store/MoviesStore";
import Sider from "antd/es/layout/Sider";
import classes from "./Pages.module.css";
import ItemNotFound from "../components/UI/ItemNotFound";
import MovieContent from "../components/movies/MovieContent";
import NavigationHolder from "../components/navigation/NavigationHolder";
import TheFooter from "../components/layout/TheFooter";

const Movie: React.FC = () => {
  const movieId = router.state.matches[0].params.movieId || null;

  return (
    <Provider MoviesStore={MoviesStore} UserStore={UserStore}>
      <Layout>
        <Sider>
          <NavigationHolder />
        </Sider>
        <Layout className={classes["main-part"]}>
          {movieId === null && (
            <ItemNotFound
              title="The film could not be found."
              extra={<Link to="/">Back to Home</Link>}
            />
          )}
          {movieId !== null && <MovieContent  id={movieId}/>}
          <TheFooter />
        </Layout>
      </Layout>
    </Provider>
  );
};

export default Movie;
