import React from "react";
import { HomeOutlined, LikeOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import classes from './MainNavigation.module.css';
import NavigationButton from "./NavigationButton";

const MainNavigation: React.FC = () => {
  return (
    <nav className={classes['main-navi']}>
      <ul>
        <li>
          <NavLink to="/">
            <NavigationButton  text="Home" icon={<HomeOutlined style={{ color: "#5e5e63", fontSize: "25px" }} />} />
          </NavLink>
        </li>
        <li>
          <NavLink to="/movies/likedmovies">
            <NavigationButton  text="Liked" icon={<LikeOutlined style={{ color: "#5e5e63", fontSize: "25px" }} />} />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
export default MainNavigation;
