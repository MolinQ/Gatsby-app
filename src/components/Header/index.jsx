import React from "react";
import SearchInput from "../SearchInput";
const Header = () => {
  return (
    <div className="w-full bg-[#558FE6] h-10 py-2 px-5 flex items-center justify-between">
      <span className="text-base">Like rozetka app</span>
      <SearchInput />
    </div>
  );
};

export default Header;
