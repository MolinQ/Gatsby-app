import React from "react";
import Loader from "../../../../.cache/loader";
import { clsx } from "clsx";

const Button = ({
  variant,
  size = "py-2 px-4",
  children,
  className,
  type,
  disabled,
  onClick,
  loading,
  ...props
}) => {
  const baseStyles =
    "w-full focus:outline-none flex justify-center items-center gap-2 rounded-[5px]";
  const variantStyles = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-300 text-gray-800 hover:bg-gray-400",
    danger: "bg-red-500 text-white hover:bg-red-600",
    outline: "bg-[#E6ECF3] text-[#558FE6] hover:bg-[#558FE6] hover:text-white",
  };

  const disabledStyles = disabled ? "cursor-not-allowed" : "";

  const classes = clsx(
    baseStyles,
    variantStyles[variant],
    size,
    className,
    disabledStyles,
  );

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={classes}
      {...props}
    >
      {loading ? <Loader size="w-5" /> : children}
    </button>
  );
};

export default Button;
