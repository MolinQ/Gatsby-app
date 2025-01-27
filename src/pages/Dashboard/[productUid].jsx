import React, { useCallback, useEffect, useState } from "react";
import useProductUidStore from "../../stores/selectedProductInfo";
import ProductServices from "../../services/ProductServices";
import Header from "../../components/Header";
import FileServices from "../../services/FileServices";
import { FILE_PATH } from "../../constants/firebasePath";
import { navigate } from "gatsby";
import { PAGE_PATH } from "../../constants/pagePath";
import ProductInfoCard from "../../components/ProductInfoCard";
import FormCard from "../../components/ui/FormCard";
import Separator from "../../components/ui/Separator";
import StorageServices from "../../services/StorageServices";
import { SESSION_KEY } from "../../constants/localStorageKeys";
import ToastEmitter from "../../services/ToastEmmiter";
import CommentForm from "../../components/CommentForm";
import CommentsList from "../../components/CommentsList";
import { useLocation } from "@gatsbyjs/reach-router";

const productService = new ProductServices();
const fileService = new FileServices();
const ProductTemplate = () => {
  const location = useLocation();
  const user = JSON.parse(StorageServices.getItem(SESSION_KEY));
  const [currentProduct, setCurrentProduct] = useState({});
  const [comments, setComments] = useState([]);
  const uid = location.pathname.split("/").at(2);

  const fetchCurrentProduct = useCallback(async () => {
    if (!uid) return;
    const res = await productService.getProductByUid(uid);
    const product = res[0];
    const photo = await fileService.getFile(`${FILE_PATH}/${uid}`);
    setCurrentProduct({ ...product, image: photo });
  }, [productService, uid, fileService]);

  useEffect(() => {
    fetchCurrentProduct();
  }, [fetchCurrentProduct]);

  const fetchComments = useCallback(async () => {
    const { productUid } = currentProduct;
    if (!productUid) return;
    const res = await productService.getCommentsBytProductUid(productUid);
    setComments(res);
  }, [currentProduct, productService]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const onSendComment = async (data) => {
    const { productUid, ownerName } = currentProduct;
    const commentUid = crypto.randomUUID();
    await productService.setComments(
      user.uid,
      data,
      productUid,
      commentUid,
      ownerName,
    );
    fetchComments();
    ToastEmitter.success("comment successfully sent");
  };

  return (
    <>
      <Header />
      <button
        onClick={() => navigate(PAGE_PATH.DASHBOARD)}
        className="w-full border border-accent max-w-[200px] mx-4 mt-4 bg-white hover:bg-accent text-accent hover:text-white rounded-lg p-1 flex justify-center items-center"
      >
        <p> {`< Back to dashboard`}</p>
      </button>
      <div className="p-4">
        <FormCard extraClasses="rounded-lg">
          <ProductInfoCard
            title={currentProduct?.title}
            image={currentProduct?.image}
            description={currentProduct?.description}
            ram={currentProduct?.ram}
            height={currentProduct?.height}
            width={currentProduct?.width}
            price={currentProduct?.price}
          />
          <Separator />
          <div>
            <CommentForm onSendComment={onSendComment}></CommentForm>
          </div>
          <Separator />
          <CommentsList comments={comments} />
        </FormCard>
      </div>
    </>
  );
};

export default ProductTemplate;
