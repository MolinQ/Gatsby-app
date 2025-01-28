import React from "react";
import { CommentSchema } from "../../schemes/CommentForm";
import TextArea from "../ui/TextArea";
import Button from "../ui/Button";
import { BUTTON_THEM } from "../../constants/buttonsDependencies";
import FormWrapper from "../Form";
import { useForm } from "react-hook-form";
import { RESET_FORM } from "../../constants/resetForm";

const CommentForm = ({ onSendComment, isSetComment }) => {
  const { formState } = useForm();

  return (
    <FormWrapper
      onSubmit={onSendComment}
      isReset={RESET_FORM}
      schema={CommentSchema}
    >
      <TextArea
        labelText={"CommentsList"}
        textClasses="text-dark text-h2 px-4 py-2"
        className="rounded-lg text-base h-20 p-2 m-3 resize-none"
        name="comment"
        id="comment"
        placeholder={"Enter your comment"}
      />
      <div className="w-full flex justify-end">
        <Button
          loading={isSetComment}
          disabled={isSetComment}
          type="submit"
          variant={BUTTON_THEM.PRIMARY}
          className="w-full max-w-[100px] m-3"
        >
          Send
        </Button>
      </div>
    </FormWrapper>
  );
};
export default CommentForm;
