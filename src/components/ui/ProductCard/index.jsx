import React, { useRef } from "react";
import { PRODUCT_IMAGE_ALT } from "../../../constants/imageAlt";
import Button from "../Button";
import { BUTTON_THEM } from "../../../constants/buttonsDependencies";
import DeleteProduct from "../../DeleteProduct";
import { createPortal } from "react-dom";
import useProductUidStore from "../../../stores/selectedProductInfo";
import { navigate } from "gatsby";
import { PAGE_PATH } from "../../../constants/pagePath";
import { useLocation } from "@gatsbyjs/reach-router";

const ProductCard = ({
  image,
  title,
  price,
  description,
  onGoDetails,
  onDeleteProduct,
  onOpenDeleteModal,
  onCloseDeleteModal,
  isDeleteModalOpen,
  productUid,
}) => {
  const deleteModalRef = useRef(null);
  const { setUid } = useProductUidStore();
  return (
    <>
      <div
        onClick={(event) => {
          event.stopPropagation();
          onGoDetails();
        }}
        className="bg-white rounded-lg p-5 w-full max-w-[400px] h-[400px] flex flex-col justify-between gap-3 hover:opacity-75 cursor-pointer transition"
      >
        <div className="flex justify-center">
          <img
            className="h-[150px] w-[200px] object-contain"
            src={image}
            alt={PRODUCT_IMAGE_ALT}
          />
        </div>
        <div className="text-[14px] flex flex-col gap-4">
          <p className="text-black font-bold text-lg truncate">{title}</p>
          <p className="text-dark truncate">{description}</p>
          <p className="text-dark text-lg font-bold truncate flex ">{price}$</p>
        </div>
        <div className="flex flex-row gap-4 mt-4 h-fit">
          <Button
            onClick={(event) => {
              event.stopPropagation();
              setUid(productUid);
              onOpenDeleteModal();
            }}
            className="text-[14px] opacity-90"
            size={"h-[37px]"}
            variant={BUTTON_THEM.DANGER}
          >
            Delete
          </Button>
          <Button
            onClick={(event) => {
              event.stopPropagation();
              setUid(productUid);
              navigate(PAGE_PATH.EDIT);
            }}
            className="text-[14px] hover:opacity-90"
            size={"h-[37px]"}
            variant={BUTTON_THEM.OUTLINE}
          >
            Edit
          </Button>
        </div>
      </div>
      {isDeleteModalOpen &&
        createPortal(
          <DeleteProduct
            deleteModalRef={deleteModalRef}
            onDeleteProduct={onDeleteProduct}
            onCloseDeleteModal={onCloseDeleteModal}
          />,
          document.body,
        )}
    </>
  );
};
export default ProductCard;
