import { useEffect } from "react";
import React from "react";
import { navigate } from "gatsby";
import { PAGE_PATH } from "../constants/pagePath";
import StorageServices from "../services/StorageServices";
import { SESSION_KEY } from "../constants/localStorageKeys";

const IndexPage = () => {
  useEffect(() => {
    const user = StorageServices.getItem(SESSION_KEY);
    if (!user) {
      navigate(PAGE_PATH.SING_IN);
    } else {
      navigate(PAGE_PATH.DASHBOARD);
    }
  }, []);

  return <p>Redirecting...</p>;
};

export default IndexPage;
