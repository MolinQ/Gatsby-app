import { clsx } from "clsx";
import React from "react";

const FormCard = ({ extraClasses, children }) => {
  return (
    <div className={clsx(extraClasses, `w-full h-full bg-white`)}>
      {children}
    </div>
  );
};

export default FormCard;
