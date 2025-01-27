import { object } from "yup";
import { ProductCommentFields } from "./formsFields/productCommentFields";

export const CommentSchema = object(ProductCommentFields);
