import { useFormContext } from "react-hook-form";
// import { MESSAGES_PATH } from "@/constants/messagePath";
import React from "react";
import classNames from "clsx";

const TextArea = ({
  name,
  className,
  textClasses,
  labelText,
  options,
  id,
  placeholder,
}) => {
  const { register, formState } = useFormContext();
  const currentError =
    name && formState.errors[name] ? formState.errors[name].message : "";

  return (
    <div className="flex flex-col gap-2 relative">
      <label
        htmlFor={id}
        className={classNames(textClasses, { "text-danger": currentError })}
      >
        {labelText}
      </label>
      <textarea
        id={id}
        placeholder={placeholder}
        className={classNames(className, {
          "border border-danger text-danger": currentError,
          "border border-darkDivided text-dark": !currentError,
        })}
        {...register(name)}
      />
      {currentError && (
        <span className="absolute text-baseRegular text-danger top-[140px] left-4 ">
          {currentError}
        </span>
      )}
    </div>
  );
};

export default TextArea;
