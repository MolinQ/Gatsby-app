import { object } from "yup";
import { productFormFields } from "./formsFields/ProductFields";

export const productSchema = object(productFormFields);
