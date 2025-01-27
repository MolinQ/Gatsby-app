import { string } from "yup";
import { PRODUCT_VALIDATION_MESSAGES } from "../validationMessages/productFormMessages";

export const productFormFields = {
  title: string().required(PRODUCT_VALIDATION_MESSAGES.required),
  description: string().required(PRODUCT_VALIDATION_MESSAGES.required),
  brand: string().required(PRODUCT_VALIDATION_MESSAGES.required),
  height: string().required(PRODUCT_VALIDATION_MESSAGES.required),
  width: string().required(PRODUCT_VALIDATION_MESSAGES.required),
  ram: string().required(PRODUCT_VALIDATION_MESSAGES.required),
  price: string().required(PRODUCT_VALIDATION_MESSAGES.required),
};
