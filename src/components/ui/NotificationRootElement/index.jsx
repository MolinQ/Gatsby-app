import React from "react";
import Notification from "../../Notification";

export const NotificationRootElement = ({ element }) => (
  <>
    <Notification />
    {element}
  </>
);
