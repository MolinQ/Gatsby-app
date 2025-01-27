import ToastEmitter from "../services/ToastEmmiter";
import { PHOTO_SUCCESS } from "../constants/photoValidationMessages";
import { photoValidation } from "./photoValidation";

export const handlePhotoValidation = async (
  selectedFile,
  setFile,
  setFileName,
) => {
  if (selectedFile) {
    try {
      await photoValidation(selectedFile);
      setFile(selectedFile);

      if (setFileName) {
        setFileName(selectedFile.name);
      }

      ToastEmitter.success(PHOTO_SUCCESS.ADD_PHOTO);
      return true;
    } catch (error) {
      if (error instanceof Error) {
        ToastEmitter.error(error.message);
        return false;
      }
    }
  }
};
