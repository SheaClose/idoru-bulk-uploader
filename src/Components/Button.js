import React from "react";
import Tooltip from "@mui/material/Tooltip";

const Button = ({
  theme = "default",
  label,
  onClick,
  disabled,
  title,
  style,
}) => {
  const themeHash = {
    default: "bg-pink hover:bg-pink-100",
    secondary: "bg-btn disabled:bg-btn hover:bg-btnHover text-white",
    actionButton:
      "bg-btn disabled:bg-btn hover:bg-btnHover !w-12 flex justify-center items-center !p-0 aspect-square",
  };
  return (
    <Tooltip enterDelay={1000} title={title} leaveDelay={0}>
      <button
        disabled={disabled}
        className={`p-4 w-32 text-md rounded-md ${themeHash[theme]}`}
        onClick={onClick}
        style={style}
      >
        {label}
      </button>
    </Tooltip>
  );
};

export default Button;
