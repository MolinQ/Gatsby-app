import { useFormContext } from "react-hook-form";
import "./style.css";
import clsx from "clsx";
import { className } from "postcss-selector-parser";
import React from "react";
const Input = ({
  formTitle,
  name,
  classForWith,
  placeholderText,
  type,
  options,
  id,
  ref,
  yPosition = "top-[60px]",
  topMarginHas = true,
}) => {
  const { register, formState } = useFormContext();
  const currentError =
    name && formState.errors[name] ? formState.errors[name].message : "";
  const textClasses = clsx(
    "text-[14px]",
    "text-dark",
    currentError ? "error" : "",
    className,
  );
  const inputClasses = clsx(
    "input",
    currentError ? "error" : "",
    classForWith,
    className,
  );
  return (
    <div className={`inputWrapper ${topMarginHas && "mt-[0.9rem]"}`}>
      <label htmlFor={id} className={textClasses}>
        {formTitle}
      </label>
      <input
        ref={ref}
        id={id}
        type={type}
        placeholder={placeholderText}
        className={inputClasses}
        {...(name && register(name))}
      />
      {currentError && (
        <span className={`errorMessage ${yPosition}`}>{currentError}</span>
      )}
    </div>
  );
};

export default Input;
