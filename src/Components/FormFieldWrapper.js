import React from "react";
import classnames from "classnames";

const FormFieldWrapper = ({ label, id, children, className }) => {
  return (
    <div className={classnames("flex flex-col", className)}>
      {label && <label htmlFor={id}>{label}</label>}
      {children}
    </div>
  );
};

export default FormFieldWrapper;
