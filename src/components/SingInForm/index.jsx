import FormWrapper from "../Form";
import Button from "../ui/Button";
import FormCard from "../ui/FormCard";
import * as React from "react";
import LocalStorageServices from "../../services/StorageServices";
import { SESSION_KEY } from "../../constants/localStorageKeys";
import { navigate } from "gatsby";
import { PAGE_PATH } from "../../constants/pagePath";
import AuthService from "../../services/AuthServices";
import { ReactComponent as GoogleIcon } from "../../images/google.svg";
import useLoading from "../../hooks/useLoading";

const authService = new AuthService();

const SingInForm = () => {
  const { loading, requestData } = useLoading();
  const onSubmit = async () => {
    await requestData(async () => {
      const res = await authService.singInWithGoogle();
      LocalStorageServices.setItem(SESSION_KEY, JSON.stringify(res.user));
      navigate(PAGE_PATH.DASHBOARD);
    });
  };
  return (
    <FormCard extraClasses="max-w-[370px] max-h-[150px] rounded-lg p-5">
      <FormWrapper
        onSubmit={onSubmit}
        extraClasses="flex justify-center items-center"
      >
        <Button
          loading={loading}
          disabled={loading}
          variant="outline"
          type="submit"
          className="rounded-lg"
        >
          <GoogleIcon />
          Log in with google
        </Button>
      </FormWrapper>
    </FormCard>
  );
};

export default SingInForm;
