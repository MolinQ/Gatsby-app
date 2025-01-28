import "./src/styles/global.css";
import React from "react";
import AuthRequired from "./src/components/AuthRequired";
export { NotificationRootElement as wrapRootElement } from "./src/components/ui/NotificationRootElement";

export const wrapPageElement = ({ element, props }) => {
  const protectedRoutes = [
    "/Dashboard",
    "/Create-product",
    "/Edit-product",
    "/My-products",
  ];

  const isProtected = protectedRoutes.some((route) =>
    props.location.pathname.startsWith(route),
  );

  if (isProtected) {
    return <AuthRequired component={() => element} {...props} />;
  }

  return element;
};

let previousPath = null;

export const onRouteUpdate = ({ location }) => {
  if (typeof window !== "undefined") {
    window.__PREVIOUS_PATH__ = previousPath;
    previousPath = location.pathname;
  }
};
