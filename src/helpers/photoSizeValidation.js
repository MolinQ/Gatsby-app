import { PHOTO_ERRORS } from "../constants/photoValidationMessages";

export const validateSize = (
  file,
  MIN_WIDTH,
  MAX_WIDTH,
  MIN_HEIGHTS,
  MAX_HEIGHTS,
) => {
  return new Promise(async (resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.src = url;

    img.onload = () => {
      const width = img.width;
      const height = img.height;
      if (
        width < MIN_WIDTH ||
        width > MAX_WIDTH ||
        height < MIN_HEIGHTS ||
        height > MAX_HEIGHTS
      ) {
        reject(new Error(PHOTO_ERRORS.SIZE));
        return;
      }
      URL.revokeObjectURL(url);
      resolve();
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
    };
  });
};
