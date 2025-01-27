import {
  COMMENT_VALIDATION_MESSAGES,
  MAX_COMMENT_LENGTH,
} from "../validationMessages/commentMessages";
import * as yup from "yup";

export const ProductCommentFields = {
  comment: yup
    .string()
    .required(COMMENT_VALIDATION_MESSAGES.required)
    .max(MAX_COMMENT_LENGTH, COMMENT_VALIDATION_MESSAGES.MAX_LENGTH),
};
