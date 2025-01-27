import React from "react";
import "./style.css";
import clsx from "clsx";

const Loader = ({ size = "w-[50px]" }) => {
  const classes = clsx("loader", size);

  return <span className={classes}></span>;
};

export default Loader;
