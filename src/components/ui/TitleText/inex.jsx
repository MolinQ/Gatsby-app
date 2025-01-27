import React from "react";
const TitleText = ({ children, size = "h1" }) => {
  return (
    <h1 className={`${size} tracking-tight text-dark mt-[5px]`}>{children}</h1>
  );
};

export default TitleText;
