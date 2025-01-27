import React, { useRef, useState } from "react";
import Header from "../../components/Header";
import FormCard from "../../components/ui/FormCard";
import Separator from "../../components/ui/Separator";
import Form from "../../components/Form";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { BUTTON_THEM } from "../../constants/buttonsDependencies";
import { navigate } from "gatsby";
import { PAGE_PATH } from "../../constants/pagePath";
import ProductServices from "../../services/ProductServices";
import { handlePhotoValidation } from "../../helpers/handlePhotoValidation";
import ToastEmitter from "../../services/ToastEmmiter";
import { PHOTO_ERRORS } from "../../constants/photoValidationMessages";
import FileServices from "../../services/FileServices";
import { COLLECTIONS_NAMES } from "../../constants/fbColectionsNames";
import LocalStorageServices from "../../services/StorageServices";
import { SESSION_KEY } from "../../constants/localStorageKeys";
import ProductForm from "../../components/Product-form";
import UploadProductPhoto from "../../components/ui/UploadProductPhoto";

const productService = new ProductServices();
const fileService = new FileServices();
const CreateProductPage = () => {
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [isOutPhoto, setIsOutPhoto] = useState(false);
  const user = JSON.parse(LocalStorageServices.getItem(SESSION_KEY));

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
    if (!file) {
      setIsOutPhoto(true);
      ToastEmitter.error(PHOTO_ERRORS.NO_PHOTO);
      return;
    }
    const productUid = crypto.randomUUID();
    const { uid, displayName } = user;
    const filePath = `${COLLECTIONS_NAMES.PRODUCT_FILES}/${productUid}`;
    const { name, type } = file;

    try {
      await fileService.upload(file, filePath);
      await productService.setProductPhoto(
        {
          fileName: name,
          type: type,
          ownerUid: uid,
          uid: productUid,
        },
        productUid,
      );
      await productService.createNewProduct(data, productUid, uid, displayName);
    } finally {
      navigate(PAGE_PATH.DASHBOARD);
    }
  };
  return (
    <div className="flex items-center flex-col">
      <Header />
      <div className="w-full p-6 flex justify-center">
        <FormCard extraClasses="rounded-lg max-w-[400px]">
          <div className="p-4 flex flex-row justify-between items-center">
            <p className="text-h2">Create product</p>
            <UploadProductPhoto
              validateState={isOutPhoto}
              fileInputRef={fileInputRef}
              file={file}
              onAddPhoto={onAddPhoto}
              onHandleAddPhoto={onHandleAddPhoto}
              image={file ? URL.createObjectURL(file) : ""}
            />
          </div>
          <Separator indents="py-2" />
          <ProductForm onSubmit={onSubmit}></ProductForm>
        </FormCard>
      </div>
    </div>
  );
};

export default CreateProductPage;
