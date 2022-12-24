import React from "react";
import Branding from "../branding/Branding";
import MainNavigation from "./MainNavigation";
import NavigationButton from "./NavigationButton";
import classes from "./NavigationHolder.module.css";
import { LogoutOutlined, LoginOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import UserStore from "../../store/UserStore";
import { observer } from "mobx-react";

const NavigationHolder: React.FC = () => {
  const isLoggedIn = !!UserStore.token;
  const logoutHandler = () => {
    UserStore.logout();
  };

  return (
    <div className={classes["sider-wrapper"]}>
      <div className={classes["top-part"]}>
        <Branding />
        <MainNavigation />
      </div>
      <div className={classes["down-part"]}>
        <div>
          {!isLoggedIn && (
            <React.Fragment>
              <NavLink className={classes['space-bottom']} to="/login">
                <NavigationButton
                  icon={
                    <LoginOutlined
                      style={{ color: "#5e5e63", fontSize: "25px" }}
                    />
                  }
                  text="Login"
                />
              </NavLink>
              <NavLink className={classes['space-bottom']} to="/register">
                <NavigationButton
                  icon={
                    <LoginOutlined
                      style={{ color: "#5e5e63", fontSize: "25px" }}
                    />
                  }
                  text="Register"
                />
              </NavLink>
            </React.Fragment>
          )}
          {isLoggedIn && (
            <NavLink to="/" onClick={logoutHandler}>
              <NavigationButton
                icon={
                  <LogoutOutlined
                    style={{ color: "#5e5e63", fontSize: "25px" }}
                  />
                }
                text="Log Out"
              />
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default observer(NavigationHolder);
