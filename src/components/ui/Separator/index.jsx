import React from "react";
const Separator = ({ indents, separatorColor = "bg-divided" }) => {
  return (
    <div className={`w-full ${indents}`}>
      <hr className={`${separatorColor} h-[1.5px]`} />
    </div>
  );
};

export default Separator;
