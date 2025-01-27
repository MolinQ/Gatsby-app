import { PHOTO_ERRORS } from "../constants/photoValidationMessages";
import { ALLOWED_FILE_TYPES } from "../constants/allowPhotoTypes";

export const validateType = async (file) => {
  const fileType = file.type;
  if (!ALLOWED_FILE_TYPES.includes(fileType)) {
    return Promise.reject(new Error(PHOTO_ERRORS.TYPE));
  }
  return Promise.resolve();
};
