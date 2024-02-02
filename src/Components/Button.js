import React from "react";

const Button = ({ theme = "default", label, onClick }) => {
  const themeHash = {
    default: "bg-pink hover:bg-pink-100",
  };
  return (
    <button
      className={`p-3  text-lg rounded-sm ${themeHash[theme]}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
