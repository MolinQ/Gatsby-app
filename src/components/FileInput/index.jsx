import React from "react";

const FileInput = ({ inputRef, onChange, handleDrop }) => {
  return (
    <>
      <input
        multiple={true}
        onDrop={handleDrop}
        ref={inputRef}
        onChange={onChange}
        className="hidden"
        type="file"
      />
    </>
  );
};

export default FileInput;
