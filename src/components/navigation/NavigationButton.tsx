import React, { ReactNode } from "react";
import classes from "./NavigationButton.module.css";

type Props = {
  icon: ReactNode;
  text: string;
};

const NavigationButton: React.FC<Props> = (props) => {
  return (
    <>
      {props.icon}
      <span className={classes.text}>{props.text}</span>
    </>
  );
};

export default NavigationButton;
