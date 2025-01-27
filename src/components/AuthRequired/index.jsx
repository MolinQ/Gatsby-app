import React, { useEffect } from "react";
import { navigate } from "gatsby";
import StorageServices from "../../services/StorageServices";
import { SESSION_KEY } from "../../constants/localStorageKeys";
import { PAGE_PATH } from "../../constants/pagePath";

const AuthRequired = ({ component: Component, ...props }) => {
  useEffect(() => {
    const user = StorageServices.getItem(SESSION_KEY);

    if (!user) {
      navigate(PAGE_PATH.SING_IN);
    }
  }, []);

  return <Component {...props} />;
};

export default AuthRequired;
