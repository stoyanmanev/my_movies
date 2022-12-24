import { Avatar } from "antd";
import React from "react";
import UserStore from "../../store/UserStore";
import { observer } from "mobx-react";
import classes from "./AvatarUI.module.css";

type Props = {
  flexType?: string;
};

const AvatarUI: React.FC<Props> = (props) => {
  const userInitials = () => {
    const [firstname, lastname] =
      UserStore.user.username !== null && UserStore.user.username !== ""
        ? UserStore.user.username.split(" ")
        : ["Anonymous"];
    const initals = `${
      firstname?.toUpperCase()[0] ? firstname.toUpperCase()[0] : ""
    }${lastname?.toUpperCase()[0] ? lastname.toUpperCase()[0] : ""}`;
    return initals;
  };

  return (
    <div className={props.flexType && classes[props.flexType]}>
      {UserStore.user.profileImg && (
        <Avatar
          src={UserStore.user.profileImg}
          alt={UserStore.user.username ? UserStore.user.username : "Anonymous"}
          size="large"
        />
      )}
      {!UserStore.user.profileImg && (
        <Avatar
          size="large"
          style={{ color: "#fff", backgroundColor: "#ad241b" }}
        >
          {userInitials()}
        </Avatar>
      )}
    </div>
  );
};

export default observer(AvatarUI);
