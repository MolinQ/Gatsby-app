import React from "react";
import SearchInput from "../ui/SearchInput";
import BurgerMenu from "../burgerMenu";
const Header = () => {
  return (
    <div className="w-full bg-[#558FE6] h-fit p-4 px-5 flex items-center justify-between flex-wrap gap-2">
      <BurgerMenu />
      <SearchInput />
    </div>
  );
};

export default Header;
