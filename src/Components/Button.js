import React from "react";

const Button = ({
  theme = "default",
  label,
  onClick,
  disabled,
  autoFocus,
  ...buttonProps
}) => {
  const themeHash = {
    default: "bg-pink hover:bg-pink-100",
    secondary: "bg-btn disabled:bg-btn hover:bg-btnHover",
    actionButton:
      "bg-btn disabled:bg-btn hover:bg-btnHover !w-12 flex justify-center items-center !p-0 aspect-square",
  };
  return (
    <button
      disabled={disabled}
      autoFocus={autoFocus}
      className={`p-4 w-32 text-md rounded-md ${themeHash[theme]}`}
      onClick={onClick}
      {...buttonProps}
    >
      {label}
    </button>
  );
};

export default Button;
