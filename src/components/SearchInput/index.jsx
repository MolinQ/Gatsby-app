import clsx from "clsx";
import "./style.css";
import { className } from "postcss-selector-parser";
import { ReactComponent as SearchIcon } from "../../images/search-icon.svg";
import { SEARCH_INPUT_PLACEHOLDER } from "../../constants/inputDependencies";
import { useLocation } from "@gatsbyjs/reach-router";

import React, { useEffect, useState } from "react";

const SearchInput = ({ classForWith }) => {
  const inputClasses = clsx("searchInput", classForWith, className);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || "",
  );

  const onSetValueToQuary = (event) => {
    const newUrl = `${window.location.pathname}?search=${event.target.value}`;

    window.history.pushState({ path: newUrl }, "", newUrl);
    setSearchQuery(event.target.value);
  };

  return (
    <div className="relative">
      <input
        onChange={(event) => onSetValueToQuary(event)}
        type="text"
        value={searchQuery}
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
