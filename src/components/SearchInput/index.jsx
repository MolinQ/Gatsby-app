import clsx from "clsx";
import "./style.css";
import { className } from "postcss-selector-parser";
import React from "react";
import { ReactComponent as SearchIcon } from "../../images/search-icon.svg";

import { SEARCH_INPUT_PLACEHOLDER } from "../../constants/inputDependencies";

const SearchInput = ({ classForWith, onChange }) => {
  const inputClasses = clsx("searchInput", classForWith, className);
  return (
    <div className="relative">
      <input
        onChange={onChange}
        type="text"
        className={inputClasses}
        placeholder={SEARCH_INPUT_PLACEHOLDER}
      />
      <div className="absolute top-1.5 left-2">
        <SearchIcon />
      </div>
    </div>
  );
};
export default SearchInput;
