import React from "react";

const Button = ({ theme = "default", label, onClick }) => {
  const themeHash = {
    default: "bg-pink hover:bg-pink-100",
    secondary: "bg-btn hover:bg-btnHover",
  };
  return (
    <button
      className={`p-4 w-32 text-md rounded-md ${themeHash[theme]}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
