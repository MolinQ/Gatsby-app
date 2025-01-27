import React from "react";
import Modal from "../ui/Modal";
import TitleText from "../ui/TitleText/inex";
import Button from "../ui/Button";
import { BUTTON_THEM } from "../../constants/buttonsDependencies";
import { ReactComponent as CrossIcon } from "../../images/cross.svg";

const DeleteProduct = ({
  deleteModalRef,
  onCloseDeleteModal,
  onDeleteProduct,
}) => {
  return (
    <Modal modalRef={deleteModalRef}>
      <div className="bg-white w-full p-4 rounded-lg">
        <div className="flex flex-row justify-between items-start">
          <TitleText>Delete product</TitleText>
          <button className="cursor-pointer" onClick={onCloseDeleteModal}>
            <CrossIcon />
          </button>
        </div>
        <div>
          <p>You really want to delete product?</p>
        </div>
        <div className="flex justify-end pt-6 pb-2 px-2 gap-4">
          <Button
            className="max-w-[100px]"
            variant={BUTTON_THEM.OUTLINE}
            onClick={onCloseDeleteModal}
          >
            Cancel
          </Button>
          <Button
            onClick={onDeleteProduct}
            className="max-w-[100px]"
            variant={BUTTON_THEM.DANGER}
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};
export default DeleteProduct;
