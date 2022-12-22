import React from "react";
import { HomeOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import classes from './MainNavigation.module.css';

const MainNavigation: React.FC = () => {
  return (
    <nav className={classes['main-navi']}>
      <ul>
        <li>
          <NavLink to="/">
            <HomeOutlined style={{ color: "#5e5e63", fontSize: "25px" }} />
            <span>Home</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
export default MainNavigation;
