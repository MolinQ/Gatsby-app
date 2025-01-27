import * as React from "react";
import { navigate } from "gatsby";
import StorageServices from "../services/StorageServices";
import SingInForm from "../components/SingInForm";
import { PAGE_PATH } from "../constants/pagePath";
import ToastEmitter from "../services/ToastEmmiter";
import TitleText from "../components/ui/TitleText/inex";
import Button from "../components/ui/Button";
import { BUTTON_THEM } from "../constants/buttonsDependencies";

const NotFoundPage = () => {
  const onRedirectTo = () => {
    const user = StorageServices.getItem(SingInForm);
    if (user) {
      navigate(PAGE_PATH.DASHBOARD);
    }
    navigate(PAGE_PATH.SING_IN);
    ToastEmitter.error("Unauthorized");
  };
  return (
    <div className="flex flex-col gap-2 justify-center items-center border p-5">
      <TitleText>Wrong path</TitleText>
      <Button onClick={onRedirectTo} variant={BUTTON_THEM.SECONDARY}>
        Get back to dashboard
      </Button>
      ;
    </div>
  );
};

export default NotFoundPage;
