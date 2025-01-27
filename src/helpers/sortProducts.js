import { SORT_TYPE } from "../constants/sortingType";

export const sortProducts = (products, order) => {
  return [...products].sort((a, b) => {
    return order === SORT_TYPE.ASK ? a.price - b.price : b.price - a.price;
  });
};
