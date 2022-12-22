import React from "react";
import classes from "./Branding.module.css";
import { Link } from "react-router-dom";
import { Image } from "antd";

const Branding: React.FC = () => {
  return (
    <div className={classes["branding-wrapper"]}>
      <Link to="/">
        <Image
          alt="My Movie - The new site for free movies without adds."
          src={require("../../assets/images/branding.png")}
          preview={false}
        />
      </Link>
    </div>
  );
};

export default Branding;
