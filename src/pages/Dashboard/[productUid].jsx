import React, { useCallback, useEffect, useState } from "react";
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
import { POST_KEY, SESSION_KEY } from "../../constants/localStorageKeys";
import ToastEmitter from "../../services/ToastEmmiter";
import CommentForm from "../../components/CommentForm";
import CommentsList from "../../components/CommentsList";
import { useLocation } from "@gatsbyjs/reach-router";
import LocalStorageServices from "../../services/StorageServices";
import useLoading from "../../hooks/useLoading";
import Loader from "../../components/Loader";
import { FirebaseError } from "@firebase/app";

const productService = new ProductServices();
const fileService = new FileServices();
const ProductTemplate = () => {
  const location = useLocation();
  const user = JSON.parse(StorageServices.getItem(SESSION_KEY));
  const [currentProduct, setCurrentProduct] = useState({});
  const [comments, setComments] = useState([]);
  const uid = location.pathname.split("/").at(2);
  const { loading, requestData } = useLoading();
  const [isSetComment, setIsSetComment] = useState(false);
  const [lastItem, setLastItem] = useState("");
  const [commentCount, setCommentCount] = useState();

  const fetchCurrentProduct = useCallback(async () => {
    if (!uid) {
      navigate(PAGE_PATH.DASHBOARD);
      return;
    }
    await requestData(async () => {
      const res = await productService.getProductByUid(uid);
      const product = res[0];
      const photo = await fileService.getFile(`${FILE_PATH}/${uid}`);
      setCurrentProduct({ ...product, image: photo });
    });
  }, [uid]);

  useEffect(() => {
    fetchCurrentProduct();
    return () => {
      LocalStorageServices.setItem(POST_KEY, "");
    };
  }, [fetchCurrentProduct]);

  const fetchComments = useCallback(async () => {
    const { productUid } = currentProduct;
    if (!productUid) return;

    const res = await productService.getCommentsBytProductUid(productUid);

    setComments(res);
  }, [currentProduct, lastItem]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const onSendComment = async (data) => {
    setIsSetComment(true);
    try {
      const { productUid, ownerName } = currentProduct;
      const commentUid = crypto.randomUUID();
      await productService.setComments(
        user.uid,
        data,
        productUid,
        commentUid,
        ownerName,
        commentUid,
      );
      fetchComments();
      ToastEmitter.success("comment successfully sent");
    } catch (error) {
      if (error instanceof FirebaseError) {
        ToastEmitter.error(error.message);
      }
    } finally {
      setIsSetComment(false);
    }
  };
  const onLoadMore = useCallback(() => {
    fetchComments();
  }, [fetchComments]);

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
          {loading ? (
            <div className="flex justify-center p-5">
              <Loader size="size-9" />
            </div>
          ) : (
            <>
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
                <CommentForm
                  isSetComment={isSetComment}
                  onSendComment={onSendComment}
                ></CommentForm>
              </div>
              <Separator />
              <CommentsList comments={comments} />
            </>
          )}
        </FormCard>
      </div>
    </>
  );
};

export default ProductTemplate;
