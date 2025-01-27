import { create } from "zustand";

const useQuarryStore = create((set) => ({
  searchText: localStorage.getItem("searchText") || "",
  setSearchText: (newValue) => {
    localStorage.setItem("searchText", newValue);
    set({ searchText: newValue });
  },
}));

export default useQuarryStore;
