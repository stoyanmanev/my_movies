import { Button, Card, Form, Input, message } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import classes from "./AuthForms.module.css";
import axios from "axios";
import { FIREBASE_API_KEY } from "../../globals";
import { observer } from "mobx-react";
import UserStore from "../../store/UserStore";

const LoginForm: React.FC = () => {

  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const onFinishHandle = async (values: any) => {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`;
    try {
      const response = await axios.post(url, {
        ...values,
        returnSecureToken: true,
      });
      const loginState: {success: boolean} = await UserStore.login(
        response.data.idToken,
        response.data.expiresIn,
        response.data.email
      );
      if(loginState.success){
        messageApi.open({
          type: "success",
          content: `Login with ${response.data.email}`,
          duration: 2,
        });
        const t = setTimeout(() => {
          clearTimeout(t);
          navigate("/");
        }, 2000)
      }else{
        throw new Error("Login failed. Please try again");
      }
    } catch (error: any) {
      const errorMsg: string =
        error.response.data.error.message || "Something went wrong";
      const mappingError =
        errorMsg === "EMAIL_NOT_FOUND" || errorMsg === "INVALID_PASSWORD"
          ? "Wrong E-Mail or Password"
          : errorMsg;
      messageApi.open({
        type: "error",
        content: mappingError,
        duration: 10,
      });
    }
  };

  return (
    <Card bordered={false} style={{ textAlign: "center" }}>
      <h1>Hello again!</h1>
      <p>
        "My Movie" is a free webapp for watching movies. If you don't already
        have an account, you can set one up{" "}
        <Link className="link" to="/" title="register">
          here
        </Link>
        .
      </p>
      {contextHolder}
      <Form
        className={classes["form"]}
        initialValues={{ remember: true }}
        onFinish={onFinishHandle}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please provide your E-Mail",
              type: "email",
            },
          ]}
        >
          <Input
            size="large"
            suffix={<MailOutlined />}
            placeholder="Your E-Mail"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please provide your Password!" }]}
        >
          <Input
            size="large"
            suffix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            minLength={2}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="btn">
            Log in
          </Button>
          <Link className="link" title="register" to="/register">
            Or register now!
          </Link>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default observer(LoginForm);
