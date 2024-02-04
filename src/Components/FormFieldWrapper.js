import React from "react";

const FormFieldWrapper = ({ label, id, children }) => {
  return (
    <div className="flex flex-col">
      {label && <label htmlFor={id}>{label}</label>}
      {children}
    </div>
  );
};

export default FormFieldWrapper;
