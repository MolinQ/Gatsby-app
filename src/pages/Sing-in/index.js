import AuthService from "../../services/AuthServices";
import * as React from "react";
import FormWrapper from "../../components/Form";
import FormCard from "../../components/FormCard";
import Button from "../../components/Button";
import { ReactComponent as GoogleIcon } from "../../images/google.svg";
import LocalStorageServices from "../../services/StorageServices";
import { navigate } from "gatsby";
import { PAGE_PATH } from "../../constants/pagePath";

const authService = new AuthService();

const SingIn = () => {
  const logInWithGoogle = async () => {
    const res = await authService.singInWithGoogle();
    LocalStorageServices.setItem("session-info", JSON.stringify(res.user));
    navigate(PAGE_PATH.DASHBOARD);
  };
  const onSubmit = async () => {
    await logInWithGoogle();
  };
  return (
    <div className="w-full h-dvh flex justify-center items-center">
      <FormCard extraClasses="max-w-[370px] max-h-[150px] rounded-lg">
        <FormWrapper
          onSubmit={onSubmit}
          extraClasses="flex justify-center items-center"
        >
          <Button variant="outline" type="submit" className="rounded-lg">
            <GoogleIcon />
            Log in with google
          </Button>
        </FormWrapper>
      </FormCard>
    </div>
  );
};
export default SingIn;
