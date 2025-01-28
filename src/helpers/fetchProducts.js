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

export const fetchProductCount = async (searchText) => {
  return await productService.getProductCount(searchText);
};
export const fetchUserProductCount = async (userUid, searchText) => {
  return await productService.getUserProductCount(userUid, searchText);
};
