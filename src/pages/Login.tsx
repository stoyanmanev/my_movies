import { Col, Layout, Row } from "antd";
import Sider from "antd/es/layout/Sider";
import { Provider } from "mobx-react";
import React from "react";
import NavigationHolder from "../components/navigation/NavigationHolder";
import { Content } from "antd/es/layout/layout";
import UserStore from "../store/UserStore";
import classes from "./Pages.module.css";
import LoginForm from "../components/Auth/LoginForm";

const Login: React.FC = () => {
  return (
    <Provider UserStore={UserStore}>
      <Layout>
        <Sider>
          <NavigationHolder />
        </Sider>
        <Layout className={classes["main-part"]}>
          <Content>
            <Row justify="center" align="middle" style={{height: '100%'}} >
              <Col span={18}>
                <LoginForm />
              </Col>
            </Row>
          </Content>
        </Layout>
      </Layout>
    </Provider>
  );
};

export default Login;
