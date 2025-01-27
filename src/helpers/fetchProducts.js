import ProductServices from "../services/ProductServices";

const productService = new ProductServices();

export const fetchProducts = async (searchText, offset, limit) => {
  return await productService.getAllProducts(searchText, offset, limit);
};

export const fetchUserProducts = async (
  ownerUid,
  searchText,
  offset,
  productLimit,
) => {
  return await productService.getUserProducts(
    ownerUid,
    searchText,
    offset,
    productLimit,
  );
};

export const fetchProductCount = async () => {
  return await productService.getProductCount();
};
export const fetchUserProductCount = async (userUid) => {
  return await productService.getUserProductCount(userUid);
};
