import React, { useEffect } from "react";
import "./style.css";
import FileInput from "../../FileInput";

const UploadProductPhoto = ({
  onHandleAddPhoto,
  fileInputRef,
  onAddPhoto,
  image,
  file,
  validateState,
}) => {
  useEffect(() => {
    console.log(validateState);
  }, [validateState]);
  return (
    <button
      onClick={onHandleAddPhoto}
      className={`addPhotoButton ${validateState ? "border border-danger" : ""}`}
    >
      {file ? (
        <img className="rounded-full object-cover" src={image} alt="Uploaded" />
      ) : (
        <span>+</span>
      )}
      <FileInput inputRef={fileInputRef} onChange={onAddPhoto} />
    </button>
  );
};
export default UploadProductPhoto;
