import { Button, Card, Form, Input, message } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import classes from "./AuthForms.module.css";
import { observer } from "mobx-react";
import UserStore from "../../store/UserStore";

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinishHandle = async (values: any) => {
    if (values["password"] !== values["repeat-password"]) {
      messageApi.open({
        type: "error",
        content: "Passwords is not equal",
        duration: 10,
      });
      return;
    }

    const checkEmail = await UserStore.fetchUserDetails(values.email, false);
    if (checkEmail.isUserExist) {
      messageApi.open({
        type: "warning",
        content: (
          <div className={classes["notification"]}>
            <p>This E-Mail is alredy used.</p>
            <p>
              Try to <Link to="/login">Log In</Link>
            </p>
          </div>
        ),
        duration: 10,
      });
      return;
    }

    const acount: { message: string; isSuccess: boolean } =
      await UserStore.createAcount(values.email, values.password);
    if ((await acount).isSuccess) {
      const t = setTimeout(() => {
        clearTimeout(t);
        navigate("/")
      }, 3000);
      messageApi.open({
        type: "success",
        content: (await acount).message,
        duration: 3,
      });
    } else {
      messageApi.open({
        type: "error",
        content: (await acount).message,
        duration: 10,
      });
    }
  };

  return (
    <Card bordered={false} style={{ textAlign: "center" }}>
      <h1>
        <span>The app is free to use, so</span> Create a new account.
      </h1>
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
        <Form.Item
          name="repeat-password"
          rules={[{ required: true, message: "Please repeat your Password!" }]}
        >
          <Input
            size="large"
            suffix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Repeat Password"
            minLength={2}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="btn">
            Register
          </Button>
          <Link className="link" title="Log In" to="/login">
            Already A Member? Log In
          </Link>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default observer(RegisterForm);
