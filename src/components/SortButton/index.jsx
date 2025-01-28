import React from "react";
import { ReactComponent as SortIcon } from "../../../src/images/sort-svgrepo-com.svg";

const SortButton = ({ onHandleSorting }) => {
  return (
    <>
      <button onClick={onHandleSorting}>
        <SortIcon />
      </button>
      <span className="text-sm text-dark">Sort by price</span>
    </>
  );
};

export default SortButton;
