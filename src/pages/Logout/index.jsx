import { useEffect } from "react";
import LocalStorageServices from "../../services/StorageServices";
import { PAGE_PATH } from "../../constants/pagePath";
import { navigate } from "gatsby";
const Logout = () => {
  useEffect(() => {
    LocalStorageServices.clearAll();
    navigate(PAGE_PATH.SING_IN);
  }, []);
};
export default Logout;
