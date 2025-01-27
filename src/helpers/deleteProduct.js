import { FILE_PATH } from "../constants/firebasePath";
import ProductServices from "../services/ProductServices";

const productService = new ProductServices();

export const handleProductDeletion = async (productUid) => {
  if (!productUid) return;
  const filePath = `${FILE_PATH}/${productUid}`;

  await productService.deleteProduct(productUid);
  await productService.deleteImg(filePath);
  await productService.deleteImgCollection(productUid);
};
