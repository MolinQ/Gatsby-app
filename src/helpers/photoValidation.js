import {
  PHOTO_MAX_HEIGHTS,
  PHOTO_MAX_WIDTH,
  PHOTO_MIN_HEIGHTS,
  PHOTO_MIN_WIDTH,
} from "../constants/photoSizes";
import { validateType } from "./photoTypeValidation";
import { validateSize } from "./photoSizeValidation";
import { PHOTO_ERRORS } from "../constants/photoValidationMessages";

export const photoValidation = async (file) => {
  if (!file) {
    return Promise.reject(new Error(PHOTO_ERRORS.NO_PHOTO));
  }

  await validateType(file);

  await validateSize(
    file,
    PHOTO_MIN_WIDTH,
    PHOTO_MAX_WIDTH,
    PHOTO_MIN_HEIGHTS,
    PHOTO_MAX_HEIGHTS,
  );
};
