import react from "react";

const FormFieldWrapper = ({ label, id, children }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={id}>{label}</label>
      {children}
    </div>
  );
};

export default FormFieldWrapper;
