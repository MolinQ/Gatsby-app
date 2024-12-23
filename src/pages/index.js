import { useEffect } from "react";
import React from "react";
import { navigate } from "gatsby";
import { PAGE_PATH } from "../constants/pagePath";

const IndexPage = () => {
  useEffect(() => {
    navigate(PAGE_PATH.SING_IN);
  }, []);

  return <p>Redirecting...</p>;
};

export default IndexPage;
