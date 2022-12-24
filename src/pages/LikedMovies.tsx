import { Layout, Row, Col } from "antd";
import Sider from "antd/es/layout/Sider";
import { Provider, observer } from "mobx-react";
import React from "react";
import NavigationHolder from "../components/navigation/NavigationHolder";
import classes from "./Pages.module.css";
import MoviesStore from "../store/MoviesStore";
import UserStore from "../store/UserStore";
import TheFooter from "../components/layout/TheFooter";
import MovieItem from "../components/movies/MovieItem";
import TheHeader from "../components/layout/TheHeader";
import { Content } from "antd/es/layout/layout";
import ItemNotFound from "../components/UI/ItemNotFound";

const LikedMovies: React.FC = () => {
  let content = (
    <Row gutter={26} style={{margin: '26px 0'}} justify="center">
      <Col span={24}>
        <ItemNotFound bordered={false} title="U dont have liked movies yet." />
      </Col>
    </Row>
  );

  if (UserStore.user?.likedMovies && UserStore.user.likedMovies.length > 0) {
    content = (
      <Row gutter={26}>
        {UserStore.user.likedMovies.map((movie) => (
          <Col key={movie.id} span={6}>
            <MovieItem
              id={movie.id}
              name={movie.name}
              imagePath={movie.imagePath}
            />
          </Col>
        ))}
      </Row>
    );
  }

  return (
    <Provider MoviesStore={MoviesStore} UserStore={UserStore}>
      <Layout>
        <Sider>
          <NavigationHolder />
        </Sider>
        <Layout className={classes["main-part"]}>
          <TheHeader />
          <Content>{content}</Content>
          <TheFooter />
        </Layout>
      </Layout>
    </Provider>
  );
};

export default observer(LikedMovies);
