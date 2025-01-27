import { FILE_PATH } from "../constants/firebasePath";
import FileServices from "../services/FileServices";

const fileService = new FileServices();

export const CreateProductWithImage = async (products) => {
  if (!Array.isArray(products)) return;
  return await Promise.all(
    products.map(async (item) => {
      const photoPath = `${FILE_PATH}/${item.productUid}`;
      const photo = await fileService.getFile(photoPath);
      return { ...item, image: photo };
    }),
  );
};
