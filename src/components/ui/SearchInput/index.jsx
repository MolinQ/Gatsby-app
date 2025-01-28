import clsx from "clsx";
import "./style.css";
import { className } from "postcss-selector-parser";
import { ReactComponent as SearchIcon } from "../../../images/search-icon.svg";
import { SEARCH_INPUT_PLACEHOLDER } from "../../../constants/inputDependencies";
import { useLocation } from "@gatsbyjs/reach-router";

import React, { useEffect, useState } from "react";
import useQuarryStore from "../../../stores/quarryStore";

const SearchInput = ({ classForWith }) => {
  const inputClasses = clsx("searchInput", classForWith, className);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || "",
  );
  const { setSearchText } = useQuarryStore();

  const onSetValueToQuery = (event) => {
    const searchText = event.target.value;
    const newUrl = `${window.location.pathname}?search=${searchText}`;
    const defaultUrl = `${window.location.pathname}`;

    if (searchText.length < 1) {
      window.history.pushState({ path: defaultUrl }, "", defaultUrl);
    } else {
      window.history.pushState({ path: newUrl }, "", newUrl);
    }
    setSearchQuery(event.target.value);
    setSearchText(event.target.value);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const initialSearchQuery = searchParams.get("search") || "";
    setSearchQuery(initialSearchQuery);
    setSearchText(initialSearchQuery);
    return () => {
      setSearchQuery("");
    };
  }, []);
  return (
    <div className="relative">
      <input
        onChange={(event) => onSetValueToQuery(event)}
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
