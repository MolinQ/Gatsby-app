import React from "react";
const Separator = ({ indents }) => {
  return (
    <div className={`w-full ${indents}`}>
      <hr className="bg-divided h-[1.5px]" />
    </div>
  );
};

export default Separator;
