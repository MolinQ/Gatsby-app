import { create } from "zustand";

const useProductUidStore = create((set) => ({
  uid: localStorage.getItem("uid") || "",
  setUid: (newValue) => {
    localStorage.setItem("uid", newValue);
    set({ uid: newValue });
  },
}));

export default useProductUidStore;
