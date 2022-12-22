import { Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Footer } from "antd/es/layout/layout";
import React from "react";
import classes from "./Home.module.css";
import Branding from "../components/branding/Branding";
import MainNavigation from "../components/navigation/MainNavigation";
import Movies from "../components/movies/Movies";
import TheHeader from "../components/layout/TheHeader";
import { Provider } from "mobx-react";
import MoviesStore from "../store/MoviesStore"

const Home: React.FC = () => {
  return (
    <Provider MoviesStore={MoviesStore}>
      <Layout>
        <Sider className={classes["sider-padding"]}>
          <Branding />
          <MainNavigation />
        </Sider>
        <Layout className={classes["main-part"]}>
          <TheHeader />
          <Content>
            <Movies />
          </Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    </Provider>
  );
};

export default Home;
