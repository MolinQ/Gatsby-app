import React, { useCallback, useEffect, useRef, useState } from "react";
import useProductUidStore from "../../stores/selectedProductInfo";
import ProductServices from "../../services/ProductServices";
import ProductForm from "../../components/Product-form";
import Header from "../../components/Header";
import FormCard from "../../components/ui/FormCard";
import UploadProductPhoto from "../../components/ui/UploadProductPhoto";
import Separator from "../../components/ui/Separator";
import LocalStorageServices from "../../services/StorageServices";
import { SESSION_KEY } from "../../constants/localStorageKeys";
import { handlePhotoValidation } from "../../helpers/handlePhotoValidation";
import Loader from "../../components/Loader";
import { FILE_PATH } from "../../constants/firebasePath";
import FileServices from "../../services/FileServices";
import ToastEmitter from "../../services/ToastEmmiter";
import { PHOTO_ERRORS } from "../../constants/photoValidationMessages";
import { navigate } from "gatsby";
import { PAGE_PATH } from "../../constants/pagePath";
import { EDIT_PRODUCT_SUCCESS } from "../../constants/submitMessages";

const productService = new ProductServices();
const fileService = new FileServices();
const EditProductPage = () => {
  const { uid } = useProductUidStore();
  const [product, setProduct] = useState([]);
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [isOutPhoto, setIsOutPhoto] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(LocalStorageServices.getItem(SESSION_KEY));
  const previousPath =
    typeof window !== "undefined" ? window.__PREVIOUS_PATH__ : null;

  const fetchProductByUid = useCallback(async () => {
    if (!uid) return;

    const photoPath = `${FILE_PATH}/${uid}`;
    const res = await productService.getProductByUid(uid);
    const photo = await fileService.getFile(photoPath);
    setProduct(res);
    setFile(photo);
  }, [uid]);
  const onHandleAddPhoto = () => {
    fileInputRef.current?.click();
  };
  const onAddPhoto = async (event) => {
    const selectedFile = event.target.files?.[0] ?? null;
    setIsOutPhoto(true);

    const res = await handlePhotoValidation(selectedFile, setFile);
    if (!res) return;
    setIsOutPhoto(false);
  };
  const onSubmit = async (data) => {
    setLoading(true);
    if (!file) {
      setIsOutPhoto(true);
      ToastEmitter.error(PHOTO_ERRORS.NO_PHOTO);
      return;
    }
    try {
      setLoading(true);
      if (typeof file !== "string") {
        const filePath = `${FILE_PATH}/${uid}`;
        const { name, type } = file;
        await fileService.upload(file, filePath);
        await productService.setProductPhoto(
          {
            fileName: name,
            type: type,
            ownerUid: user.uid,
            uid: uid,
          },
          uid,
        );
      }
      await productService.createNewProduct(
        data,
        uid,
        user.uid,
        user.displayName,
      );
    } finally {
      setLoading(false);
      ToastEmitter.success(EDIT_PRODUCT_SUCCESS);
      if (previousPath === `${PAGE_PATH.DASHBOARD}/`) {
        navigate(PAGE_PATH.DASHBOARD);
      } else {
        navigate(PAGE_PATH.MY_PRODUCTS);
      }
    }
  };
  useEffect(() => {
    fetchProductByUid();
  }, [fetchProductByUid]);
  return (
    <div className="flex items-center flex-col">
      <Header />
      <div className="w-full p-6 flex justify-center">
        {product.length < 1 ? (
          <div>
            <Loader size="size-5" />
          </div>
        ) : (
          <FormCard extraClasses="rounded-lg max-w-[400px]">
            <div className="p-4 flex flex-row justify-between items-center">
              <p className="text-h2">Edit product</p>
              <UploadProductPhoto
                validateState={isOutPhoto}
                fileInputRef={fileInputRef}
                file={file}
                onAddPhoto={onAddPhoto}
                onHandleAddPhoto={onHandleAddPhoto}
                image={
                  typeof file === "string" ? file : URL.createObjectURL(file)
                }
              />
            </div>
            <Separator indents="py-2" />
            <ProductForm
              loading={loading}
              defaultValue={product[0]}
              onSubmit={onSubmit}
            ></ProductForm>
          </FormCard>
        )}
      </div>
    </div>
  );
};

export default EditProductPage;
