import { create } from "zustand";

const useQuarryStore = create((set) => ({
  searchText: "",
  setSearchText: (newValue) => {
    set({ searchText: newValue });
  },
}));

export default useQuarryStore;
