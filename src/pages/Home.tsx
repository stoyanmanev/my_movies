import { Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import React from "react";
import classes from "./Pages.module.css";
import Movies from "../components/movies/Movies";
import TheHeader from "../components/layout/TheHeader";
import { Provider } from "mobx-react";
import MoviesStore from "../store/MoviesStore";
import UserStore from "../store/UserStore";
import NavigationHolder from "../components/navigation/NavigationHolder";
import TheFooter from "../components/layout/TheFooter";

const Home: React.FC = () => {
  return (
    <Provider MoviesStore={MoviesStore} UserStore={UserStore}>
      <Layout>
        <Sider>
          <NavigationHolder />
        </Sider>
        <Layout className={classes["main-part"]}>
          <TheHeader />
          <Content>
            <Movies />
          </Content>
          <TheFooter />
        </Layout>
      </Layout>
    </Provider>
  );
};

export default Home;
