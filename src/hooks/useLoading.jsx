import { useCallback, useState } from "react";
import { FirebaseError } from "@firebase/app";
import ToastEmitter from "../services/ToastEmmiter";

const useLoading = (callback, deps) => {
  const [loading, setLoading] = useState(false);

  const requestData = useCallback(async (callback) => {
    setLoading(true);
    try {
      await callback();
    } catch (error) {
      if (error instanceof FirebaseError) {
        ToastEmitter.error(error.message);
      } else if (error instanceof Error) {
        ToastEmitter.error(error);
      }
    } finally {
      setLoading(false);
    }
  }, deps);
  return { loading, requestData };
};

export default useLoading;
